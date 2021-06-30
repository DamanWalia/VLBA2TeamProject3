#!/bin/bash

echo "Creating Datastore/App Engine instance"
gcloud app create --region "us-central"

echo "Creating bucket: gs://$DEVSHELL_PROJECT_ID-media"
gsutil mb gs://$DEVSHELL_PROJECT_ID-media

echo "Exporting GCLOUD_PROJECT and GCLOUD_BUCKET"
export GCLOUD_PROJECT=$DEVSHELL_PROJECT_ID
export GCLOUD_BUCKET=$DEVSHELL_PROJECT_ID-media

echo "Creating virtual environment"
mkdir ~/venvs
virtualenv -p python3 ~/venvs/developingapps
source ~/venvs/developingapps/bin/activate

echo "Installing Python libraries"
pip install --upgrade pip
pip install -r requirements.txt

echo "Creating Datastore entities"
python add_entities.py

echo "Creating ecomm-account Service Account"
gcloud iam service-accounts create ecomm-account --display-name "Ecomm Account"
gcloud iam service-accounts keys create key.json --iam-account=ecomm-account@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com
export GOOGLE_APPLICATION_CREDENTIALS=key.json

echo "Setting ecomm-account IAM Role"
gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID --member serviceAccount:ecomm-account@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role roles/owner

echo "Creating Cloud Pub/Sub topic"
gcloud beta pubsub topics create feedback
gcloud beta pubsub subscriptions create worker-subscription --topic feedback

echo "Creating Cloud Spanner Instance, Database, and Table"
gcloud spanner instances create ecomm-instance --config=regional-us-central1 --description="Ecomm instance" --nodes=1
gcloud spanner databases create ecomm-database --instance ecomm-instance --ddl "CREATE TABLE Orders ( feedbackId STRING(100) NOT NULL, email STRING(100), ecommSTRING(20), feedback STRING(MAX), rating INT64, score FLOAT64, timestamp INT64 ) PRIMARY KEY (feedbackId);"

echo "Project ID: $DEVSHELL_PROJECT_ID"