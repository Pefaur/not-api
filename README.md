# Not API

NotAPI allows you to swiftly generate a mock API, providing an efficient way to test your applications.

### Install

```bash 
yarn install
```

### Run

#### Install NotAPI globally

```bash 
npm install -g
```

#### Run NotAPI (Default port 5010)

```bash 
npx not-api
```


### usign NPX
NPX is a tool that comes with npm, allowing you to execute Node.js packages without having to install them globally. In this case, we're using NPX to run the `not-api` package.

To run `not-api` with NPX, use the following command:

```bash 
npx not-api
```

| Flag | Description | Default |
| --- | --- | --- |
| `-d` | Specifies the directory where the mock json files are located. | Current directory |
| `-p` | Defines the API port. | 5010 |
| `-o` | Specify the URL of the API to be intercepted. | none |

### Accessing Localhost from a Physical Android Device

To connect your physical Android device to the localhost for testing, you need to use the `adb reverse` command. This command redirects the network traffic from a specific port on your device to a port on your local machine. 

Run the following command:

```bash 
adb reverse tcp:5010 tcp:5010