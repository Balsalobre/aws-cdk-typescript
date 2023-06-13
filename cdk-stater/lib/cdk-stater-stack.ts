import { Stack, StackProps, Duration, CfnOutput, CfnParameter } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

// 3. Using a Bucket construct with a custom resource
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expirationInDays: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expirationInDays)
      }]
    });
  }
}

export class CdkStaterStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create an S3 bucket 3 ways to do it

    // 1. Directly
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled'
        }]

      }
    });

    const duration = new CfnParameter(this, 'duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number',
    })

    // 2. Using a Bucket construct
    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(duration.valueAsNumber)
      }]
    });

    new CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName
    });
    
    // 3. Using a Bucket construct with a custom resource
    new L3Bucket(this, 'MyL3Bucket', 3);
  }
}
