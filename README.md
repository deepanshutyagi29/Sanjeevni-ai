# Sanjeevni-AI

[GitHub Repository](https://github.com/deepanshutyagi29/Sanjeevni-ai)  
**Owner:** Deepanshu Tyagi

## Inspiration
Sanjeevni was inspired by the healthcare disparities in India, with a mission to make healthcare a right for all. This project aims to address two critical issues:
- Shortage of medical professionals.
- Lack of comprehensive disease outbreak data in rural areas for the government.

## What It Does
Sanjeevni is an AI-powered healthcare software solution designed specifically for the medical needs of Indians, especially in rural regions. Key features include:

- **Local Language Support:** Supports most of India's officially recognized local languages to reach all corners of the country.
- **Context Maintenance:** Remembers previous ailments and user interactions to provide personalized, accurate diagnoses of related health issues.
- **Patient-Confidentiality:** Uses advanced Web3 technologies to ensure anonymity and protect private patient data.
- **Disease Outbreak Monitoring Dashboard:** Provides a dashboard with anonymized data on disease trends to aid government response and preventive actions.

## How We Built It
Sanjeevni is a responsive web application built with:
- **Frontend:** React, with 3D models and animations created in Blender and integrated using Three.js.
- **LLM:** GPT-3.5-turbo fine-tuned on PubMed data, ensuring reliable and effective consultancy.
- **Database:** MongoDB for storing contexts anonymously.
- **Aadhar Login Anonymity:** Aadhar IDs are stored on IPFS, with IPFS CIDs used to manage user sessions without direct personal identifiers.

## Challenges We Faced
1. **Voice Speech Recognition:** Initially faced issues with ML models, later resolved using the WebSpeech API for regional language support.
2. **Voice Translation:** Overcame language translation challenges by integrating the Google Translate API to translate regional languages to English.
3. **LLM Response Generation:** Improved health assistant model accuracy by fine-tuning with health research papers.
4. **Text-to-Speech in Regional Languages:** Addressed language accent challenges by using the Google Cloud Text-to-Speech (TTS) library.
5. **Blockchain Smart Contract for User Security:** Managed gasless smart contract interaction using Biconomy SDK, avoiding the need for users to create wallets.

## Accomplishments
With a team of two students with no prior experience in 3D rendering, we achieved full integration of 3D animations, LLMs, blockchain, and web application development within 36 hours.

## Lessons Learned
- 3D modeling and Blender
- Effective team collaboration
- Time management under a tight deadline

## Future Plans
- **Voice Accessibility:** Enable access via automated calls, improving reach.
- **Open-Source LLMs:** Transition from closed to open-source LLMs to reduce dependency on proprietary models.

## Built With
- Blender
- Ethereum
- Express.js
- IPFS
- MongoDB
- OpenAI
- React
- Three.js
