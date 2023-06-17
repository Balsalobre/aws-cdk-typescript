#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PhotosStack } from '../lib/photos-stack';
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack';

const app = new cdk.App();
// Inicializa un stack de CDK con el nombre CdkStaterStack
// podemos tener multiples stacks en un proyecto CDK pero con diferentes nombres

// new CdkStaterStack(app, 'CdkFirstStaterStack');

new PhotosStack(app, 'PhotosStack');
new PhotosHandlerStack(app, 'PhotosHandlerStack');
