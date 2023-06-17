import { Fn, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";

export class PhotosHandlerStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const targetBucket = Fn.importValue('photos-bucket');

        new LambdaFunction(this, 'PhotosHandler', {
            runtime: Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: Code.fromInline(`
                exports.handler = async event => {
                    console.log("Hello, world! >> " + process.env.TARGET_BUCKET);
                    console.log("EVENT >> " + JSON.stringify(event, null, 2));
                };
            `),
            environment: {
                TARGET_BUCKET: targetBucket
            }
        });
    }

}
