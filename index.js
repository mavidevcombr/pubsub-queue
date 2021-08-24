const {PubSub} = require('@google-cloud/pubsub');
// Instantiates a client
var PubSubQueue = function(projectId, topicId)
{
  this.projectId = projectId;
  this.topicId = topicId;
  const pubsub = new PubSub({projectId});


  this.sendJob = async function(data){
    var self = this;
    dataBuffer = Buffer.from(Buffer.from(JSON.stringify(data)).toString('base64').toString());
    return await pubsub.topic(self.topicId).publish(dataBuffer);
  };

  this.getJob = async function(subscription_id, limit){
    var self = this;
    const pubsub = require('@google-cloud/pubsub');
    const client = new pubsub.v1.SubscriberClient();
    const formattedSubscription = client.subscriptionPath(
      projectId,
      subscription_id
    );

    const request = {
      subscription: formattedSubscription,
      returnImmediately : true,
      maxMessages: limit,
      maxConnections : 1,
      requestTimeout : 3,
      timeout : 3,
    };

    // The subscriber pulls a specified number of messages.
    const [response] = await client.pull(request);

    return {
      'payload' : response,
      'client' : client,
      'subscription_path' : formattedSubscription
    };
  };
}


module.exports = PubSubQueue;
