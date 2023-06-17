import { CfnOutput, Fn, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends Stack {

    private stackSuffix: string;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.initializeStackSuffix();

        const photosBucket = new Bucket(this, 'PhotosBucket2', {
            bucketName: `photos-bucket-${this.stackSuffix}` // Phisical ID of the bucket
        });

        new CfnOutput(this, 'photos-bucket', {
            value: photosBucket.bucketArn, // Most common way to reference a resource in CDK
            exportName: 'photos-bucket'
        });

        // We do this to override the logical ID of the bucket in the CloudFormation template
        // This is useful when we want to use the same logical ID in different stacks
        // and we want to avoid a name collision
        // (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket29rewrl')
    }

    private initializeStackSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
    }
}
