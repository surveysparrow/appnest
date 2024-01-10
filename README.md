# Appnest

![alt text](./Thumbnail2.png)


### Leverage your team’s expertise and craft custom-built apps that cater to your company’s unique needs.
***

### Welcome to the AppNest Marketplace repository!

This repository houses the tutorials and documentation for AppNest, a dynamic and versatile marketplace developed by SurveySparrow. AppNest empowers businesses to enhance their SurveySparrow experience by seamlessly integrating with a variety of third-party applications and services.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tools](#tools)
- [Getting Started](#getting-started)
- [Why use SSDK?](#why-use-ssdk)
- [3 ways to build apps on the AppNest marketplace](#3-ways-to-build-apps-on-the-appnest-marketplace)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [License](#license)
- [Contact](#contact)

## Overview
AppNest Marketplace is a comprehensive ecosystem designed to extend the functionality of SurveySparrow. With a focus on flexibility and user-friendly integration, AppNest simplifies the process of connecting SurveySparrow with various applications and services, streamlining workflows and enhancing productivity.

</br>

## Features
- **Seamless Integration:** Connect SurveySparrow with popular third-party apps effortlessly.
- **Customization:** Tailor AppNest to meet your specific business needs with easy-to-use configuration options.
- **Automated Workflows:** Streamline processes by automating tasks and data flow between SurveySparrow and integrated applications.
- **Scalability:** Easily scale your integration ecosystem as your business grows, adding new apps and services with ease.
- **Security:** Prioritize data security with robust encryption and authentication mechanisms.

</br>

## Tools
- **SSDK CLI:** The SurveySparrow Developer Kit (SSDK) empowers you to build custom applications seamlessly within the AppNest marketplace.
- **Twigs:** A flexible, customizable, and accessible React component library for building UIs.
- **REST API:** A list of endpoints that offers a straightforward and efficient way to integrate SurveySparrow into your applications.

</br>

## Getting Started
We recommend newcomers first sign up to SurveySparrow for a free trial and get a hands-on understanding of how the platform works.

### SSDK SETUP

#### Install NVM

##### MacOS

1. Install Homebrew (if not installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. To Verify the installation of brew
    ```bash
    brew --version
    ```

3. Install NVM via brew
    ```
    brew install nvm
    ```

##### Windows

1. Install Chocolatey Package Manager - Make sure to open Windows Powershell in administrator mode in order to install Chocolatey.

    ```bash
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    ```

2. Verify Chocolatey installation
    
    ```bash
    choco -v
    ```

3. Install NVM through the Chocolatey Package Manager

    ```bash
    choco install nvm
    ```

4. Verify NVM installation

    ```bash
    nvm --version
    ```

##### Ubuntu
1. If you don’t have curl installed already, install it
    ```bash
    sudo apt-get install curl
    ```

2. Run the nvm installation script as shown below

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    ```

3. The script clones the nvm repository to ~/.nvm, and attempts to add the source lines from the snippet below to the correct profile file (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

    ```bash
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh”
    ```

#### Install Node
If you already have Node version v18.13.0 installed locally, skip this step.

1. Use nvm to install Node 18
    ```bash
    nvm install 18
    ```

2. Verify the Node version
    ```bash
    node -v
    ```

#### Install Mkcert
Mkcert is a command-line tool that does two things: It generates a local certificate authority on your machine. It creates self-signed SSL certificates against that authority.

Mkcert does not have native support in Firefox. To proceed with your development work, you have the choice to either bypass security measures or manually integrate the certificate into your browser settings.

##### MacOS and Ubuntu
```bash
brew install mkcert
```
##### Windows
```bash
choco install mkcert
```

#### Install SSDK
1. Install SSDK CLI using NPM(Node Package Manager)

    ```bash
    npm install https://ssdk.surveysparrow.dev/ssdk.tgz -g
    ```

2. Verify the installation

    ```bash
    ssdk version
    ```

#### Building an app

1. Create and initialize the app

    ```bash
    ssdk create
    ```

2. To run your application

    ```bash
    ssdk run
    ```

Check out this [documentation](https://sdk.surveysparrow.dev/docs/getting-started/quick-start.html) for all the SSDK commands.

</br>

## Why use SSDK?

The SSDK CLI offers some of the most efficient and time-saving features that ramp up your development process. Let’s explore a few of them.

### Simplifying OAuth

Handling the OAuth process for third-party integration can be challenging when writing secure code. That's why the SSDK CLI simplifies this by managing the entire OAuth process using third-party credentials specified by developers.

### IParams (Installation Parameters)

Empowering users to upload essential information, such as the user’s name, and API keys, is made seamless with IParams. It prompts users to fill in these details during the app installation, ensuring a smooth installation process.

### App Locations

Alter your application's rendering based on the requirements by choosing from 11 different locations. Developers can specify the desired location in the manifest.json file, providing flexibility based on the app's needs.

### Lifecycle Methods

Building a secure and robust application is simplified with SSDK CLI's in-built lifecycle methods. These methods facilitate secure API calls, data storage, and sending alert messages, ensuring the integrity of your application throughout its lifecycle.

### SMI Functions (Server Method Invocation)

Enabling seamless communication between the client-side and server-side is crucial. SSDK CLI makes it effortless for applications to invoke server-side components or functions using SMI functions.

### Event-Driven Serverless Functionalities

Leverage the serverless capabilities of SSDK CLI to respond to various events in SurveySparrow. Run algorithms or perform specific tasks when triggered events occur, enhancing the responsiveness and efficiency of your application.

### Scheduled Task Management

For applications requiring scheduled events, whether one-time or recurring, the SSDK CLI introduces the $Scheduler object. This feature allows developers to effortlessly create, manage, and delete schedules, providing a powerful tool for task automation.

</br>

## 3 ways to build apps on the AppNest marketplace

There are practically three different ways to build applications on the AppNest marketplace based on the app’s unique needs.

1. **Frontend Apps:**
   Craft innovative applications with a robust user interface that seamlessly integrates SurveySparrow and any necessary third-party services.
   
   *Example:* Ease up the Survey creation process by integrating ChatGPT and generating professional and engaging surveys based on the user’s prompt and directly uploading the questions to the user’s account.
   
   </br>

2. **Serverless Apps:**
   Dive into the future of application development with serverless apps. These applications harness the power of serverless events, allowing them to execute specific tasks whenever a predefined event takes place.
   
   *Example:* Automatically create a Google contact every time a new contact gets created on the SurveySparrow account.

    </br>
3. **Scheduler Apps:**
   Streamline your app's functionality by focusing on scheduling. Whether it's a one-time event or a recurring task, Scheduler Apps are designed to effortlessly manage and execute scheduled events.
   
   *Example:* An app that allows users to schedule a task that migrates all the contacts from a remote SFTP server to SurveySparrow’s contacts on a specific date every week or every month.

2. **Serverless Apps:**
   Dive into the future of application development with serverless apps. These applications harness the power of serverless events, allowing them to execute specific tasks whenever a predefined event takes place.
   
   *Example: Automatically create a Google contact every time a new contact gets created on the SurveySparrow account.*

3. **Scheduler Apps:**
   Streamline your app's functionality by focusing on scheduling. Whether it's a one-time event or a recurring task, Scheduler Apps are designed to effortlessly manage and execute scheduled events.
   *Example: An app that allows users to schedule a task that migrates all the contacts from a remote SFTP server to SurveySparrow’s contacts on a specific date every week or every month.*

</br>

## Contributing

We welcome innovative applications to be published on the AppNest Marketplace which follows our Contribution Guidelines.

To make your life easier, we’ve crafted a set of business use cases that we would like you to explore so you can understand what can be considered an AppNest product!

## Documentation

We’ve constructed elaborate documentation that simplifies the various terminologies and concepts involved in the AppNest marketplace.

- [SurveySparrow](https://www.surveysparrow.com/)
- [AppNest](https://appnest.surveysparrow.com/)
- [Public REST API](https://developers.surveysparrow.com/rest-apis)
- [SSDK CLI](https://sdk.surveysparrow.dev/)
- [Twigs](https://twigs.surveysparrow.com/)
- [Codelabs](https://codelabs.surveysparrow.com/)

## License

AppNest Marketplace is licensed under the MIT License.

## Contact

For inquiries and support, please contact us at [support@surveysparrow.dev](mailto:support@surveysparrow.dev) or join our [developer community](https://community.surveysparrow.com/).

We look forward to seeing the innovative ways you enhance SurveySparrow experience with our versatile marketplace.
