# 🧠 Handwritten Digit Recognizer

This is a machine learning web app that recognizes hand-drawn digits using a Convolutional Neural Network (CNN) built on a ResNet architecture. The app is powered by Flask on the backend and allows users to draw a digit directly in the browser and get a real-time prediction.

## 🔍 Project Overview

I started this project using a Random Forest model, which performed poorly on raw image data due to its inability to capture spatial patterns. To improve accuracy, I transitioned to a CNN trained on the MNIST dataset using a ResNet backbone, which is better suited for image recognition tasks.

## 🚀 Features

- Draw digits directly in the browser
- Real-time prediction and display of model output
- REST API built with Flask
- CNN model trained on MNIST with high accuracy
- Switch from classical ML to deep learning explained in code and comments

## 🧱 Tech Stack

- Python
- Flask
- TensorFlow / PyTorch (whichever you used)
- JavaScript (for the drawing interface)
- HTML/CSS

## 🛠️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone this repo
   cd digit-recognizer
