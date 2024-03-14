# Not API

NotAPI allows you to swiftly generate a mock API, providing an efficient way to test your applications.

### Install

#### Install globally

```bash
npm install -g not-api
```

#### Run (Default port 5010)

```bash
not-api
```

### usign NPX
NPX is a tool that comes with npm, allowing you to execute Node.js packages without having to install them globally. In this case, we're using NPX to run the `not-api` package.

To run `not-api` with NPX, use the following command:

```bash 
npx not-api
```

| Flag | Description | Default |
| --- | --- | --- |
| `-d` | Specifies the directory where the mock json files are located. | .not-api |
| `-p` | Defines the API port. | 5010 |
| `-o` | Specify the URL of the API to be intercepted. | none |

Warning: Port 5022 is reserved for notAPI's internal API and is not available for other uses.

### Accessing Localhost from a Physical Android Device

To connect your physical Android device to the localhost for testing, you need to use the `adb reverse` command. This command redirects the network traffic from a specific port on your device to a port on your local machine. 

Run the following command:

```bash 
adb reverse tcp:5010 tcp:5010
```


### Examples

#### Run on a specific port

```bash
not-api -p 5009
```

#### Run with intercepted API

```bash
not-api -o https://my-url-api.io
```

#### Run with custom dir

```bash
not-api -d ./mock-api
```

### Example Structure Mock


```json
{
    "uri": "/login",
    "method": "POST",
    "responses": [
        {
            "name": "Success Login",
            "statusCode": 200,
            "delay": 200,
            "response": {
                "token": "eyJhbGciOiJIUzI1NiIsInR4cCI6IkpXVCJ8.eyJzdWIiOi",
                "name": "John Doe"
              }
        },
        {
            "name": "Error Contraseña inválida",
            "statusCode": 401,
            "delay": 100,
            "response": {
                "code": "E001",
                "message": "Contraseña inválida"
            }
        }
    ]
}
```