# Gcloud Pub/Sub Queue Class

## How to install

``` sh
npm install --save mavidev/pubsub-queue
```

### How to instantiate class


 - Param **project_id** - ``` string ``` : ``` example-proj ```
 - Param **topic_name** - ``` string ``` : ``` example_topic ```

``` js
var pubSubQueue = new PubSubQueue(project_id, topic_name);
```

### How to send job to topic_name

 - Param **data** - ``` object|array ``` : ``` {"foo" : "bar"} ```

``` js
data = {"foo" : "bar"}
await pubSubQueue.sendJob(data);

```

### How to get job from subscriber

 - Param **subscriber_name** - ``` string ``` : ``` example_sub ``` - name of subscriber
 - Param **limit** - ``` int ``` : 10 - Quantity of messages to receive


``` js
async function do_process()
{
  const items = await pubSubQueue.getJob('sub_teste', 1);

  const response = items.payload.receivedMessages;
  for(var i in response)
  {
    item = response[i];
    console.log(item);
    console.log(Buffer.from(item.message.data, 'base64').toString('utf-8'));
    const ackRequest = {
           subscription: items.subscription_path,
           ackIds: [item.ackId],
    };
    await items.client.acknowledge(ackRequest);
  }
}


do_process();
```


### Release notes
#### 1.0.7
 - Bugfix readme
#### 1.0.6
 - Bugfix readme
 - Bugfix base64 buffer enconding
#### 1.0.5
 - Bugfix base64 buffer enconding

#### 1.0.4
 - Bugfix readme docs

#### 1.0.3
 - Bugfix readme docs

#### 1.0.2
 - Bugfix readme docs

#### 1.0.1
 - Bugfix readme docs

#### 1.0.0
 - First commit
 - Class defined and all functions working
