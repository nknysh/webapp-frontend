#!/usr/bin/env bash
artifact_version=version-$CIRCLE_BUILD_NUM
aws s3 sync ./dist $S3_ARTIFACT_PATH/$artifact_version/