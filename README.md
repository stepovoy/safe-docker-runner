# avra-starter
  
Run All Project in Docker via docker-compose down && docker-compose up -d w/o errors

## Usage

#### Run Project
```
node index --app ${app} --action ${action}
```
where ${app} is an app you want to go up or down and ${action} is action: down/up

#### Run test file
```js
DEBUG=elector node src/test.js
```