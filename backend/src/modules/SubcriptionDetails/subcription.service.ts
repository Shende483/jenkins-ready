import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './subcription.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async createSubscription(
    details: {
      planId: string;
      planName: string;
      numberOfBroker: number;
      startDate: Date;
      endDate: Date;
      status: string;
      userId: object; // Added `userId` to receive it directly from the controller
      email: string; // Added `email` to receive it directly from the controller
    },
    req: any,
    res: any,
  ) {
    const { userId, email } = details; // Extract `userId` and `email` from details

    // Log user details for confirmation
    console.log(`🟠 Received UserId: ${userId}, 🔵 Email: ${email}`);

    // Check if a subscription with the same plan name already exists for the user
    const existingSubscription = await this.subscriptionModel.findOne({
      userId,
      planName: details.planName,
    });

    if (existingSubscription) {
      return res.status(400).json({
        statusCode: 400,
        message: `Plan ${existingSubscription.planName} already exists for this user. Try a different name.`,
        success: false,
      });
    }

    // Create a new subscription document
    const newSubscription = new this.subscriptionModel({
      ...details,
      userId,
    });

    // Save the new subscription to the database
    const savedSubscription = await newSubscription.save();

    // Return a success response
    return res.status(201).json({
      statusCode: 201,
      message: 'Plan subscribed successfully.',
      success: true,
      subscriptionId: savedSubscription._id.toString(),
    });
  }
}
