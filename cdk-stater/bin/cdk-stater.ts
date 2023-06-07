#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStaterStack } from '../lib/cdk-stater-stack';

const app = new cdk.App();
// Inicializa un stack de CDK con el nombre CdkStaterStack
// podemos tener multiples stacks en un proyecto CDK pero con diferentes nombres
new CdkStaterStack(app, 'CdkFirstStaterStack');