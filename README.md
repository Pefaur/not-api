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

| Flag | Description | Default |
| --- | --- | --- |
| `--dir` | Specifies the directory where the mock json files are located. | Current directory |
| `--port` | Defines the API port. | 5010 |

#### To access localhost from a physical device, you must run:

```bash 
adb reverse tcp:5010 tcp:5010
```