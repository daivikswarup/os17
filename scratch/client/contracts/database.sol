contract database {

  // public properties, available to be called
  address public owner;
  struct image{
    string ipfs_hash;
    string prev_user_ipfs_hash;
    string prev_location_ipfs_hash;
    string prev_topic_ipfs_hash;
    string next_user_ipfs_hash;
    string next_location_ipfs_hash;
    string next_topic_ipfs_hash;
    
    string topic;
    string location;
    address user;

  }
  mapping(string => image)  images;

  mapping(address => string)  user_images;

  mapping(string => string)  location_images;

  mapping(string => string)  topic_images;
  
  event created(string hash,address user,string location,string topic);
  event deleted(string hash);
  
  string public val;


  // functions with the same name as the contract get invoked on deployment
  function database() public 
  {
    // set the owner address
    owner = msg.sender;
  }

  // anyone can register an address
  function upload(string ipfshash,string location,string topic) public 
  {
    // Check that image with the same hash does not already exist
    if(bytes(images[ipfshash].ipfs_hash).length != 0)
      throw;
    image memory newImage;
    
    newImage.ipfs_hash = ipfshash;

    newImage.prev_user_ipfs_hash = user_images[msg.sender];
    // if(bytes(user_images[msg.sender]).length != 0)
    images[user_images[msg.sender]].next_user_ipfs_hash = ipfshash;
    user_images[msg.sender] = ipfshash;
    newImage.next_user_ipfs_hash = "";
    
    newImage.prev_location_ipfs_hash = location_images[location];
    // if(bytes(location_images[location]).length != 0)
    images[location_images[location]].next_location_ipfs_hash = ipfshash;
    location_images[location] = ipfshash;
    newImage.next_location_ipfs_hash = "";

    newImage.prev_topic_ipfs_hash = topic_images[topic];
    // if(bytes(topic_images[topic]).length != 0)
    images[topic_images[location]].next_topic_ipfs_hash = ipfshash;
    topic_images[topic] = ipfshash;
    newImage.next_topic_ipfs_hash = "";

    newImage.topic = topic;
    newImage.location = location;
    newImage.user = msg.sender;
    
    images[ipfshash] = newImage;
    created(ipfshash,msg.sender,location,topic);
  }

  // Get previous image in list
  function get_topic_prev(string topic,string hash)  constant public returns (string) 
  {
    if( bytes(hash).length == 0)
        return topic_images[topic];
    return images[hash].prev_topic_ipfs_hash;
  }

  function get_user_prev(string hash) constant public returns (string)
  {
    if( bytes(hash).length == 0)
        return user_images[msg.sender];
    return images[hash].prev_user_ipfs_hash;
  }

  function get_location_prev(string location,string hash) constant public returns (string)
  {
    if( bytes(hash).length == 0)
      return location_images[location];
    return images[hash].prev_location_ipfs_hash;
  }

  // Get next image in list
  function get_topic_next(string topic,string hash) constant public returns (string)
  {
    if( bytes(hash).length == 0)
      return topic_images[topic];
    return images[hash].next_topic_ipfs_hash;
  }

  function get_user_next(string hash) constant public returns (string)
  {
    if( bytes(hash).length == 0)
      return user_images[msg.sender];
    return images[hash].next_user_ipfs_hash;
  }

  function get_location_next(string location,string hash) constant public returns (string)
  {
    if( bytes(hash).length == 0)
      return location_images[location];
    return images[hash].next_location_ipfs_hash;
  }

  
  // get metadata from hash
  function get_metadata(string hash) constant public returns(string,string,address)
  {
    return(images[hash].topic,images[hash].location,images[hash].user);
  }


  function delete_image(string hash) public
  {
    // You can only delete your own images
    if(images[hash].user != msg.sender)
      throw;

    if(bytes(images[hash].prev_topic_ipfs_hash).length != 0)
      images[images[hash].prev_topic_ipfs_hash].next_topic_ipfs_hash = images[hash].next_topic_ipfs_hash;
    // if this was the most recent image
    if(bytes(images[hash].next_topic_ipfs_hash).length == 0)
      topic_images[images[hash].topic] = images[hash].prev_topic_ipfs_hash;
    else
      images[images[hash].next_topic_ipfs_hash].prev_topic_ipfs_hash = images[hash].prev_topic_ipfs_hash;

    if(bytes(images[hash].prev_user_ipfs_hash).length != 0)
      images[images[hash].prev_user_ipfs_hash].next_user_ipfs_hash = images[hash].next_user_ipfs_hash;
    // if this was the most recent image
    if(bytes(images[hash].next_user_ipfs_hash).length == 0)
      user_images[images[hash].user] = images[hash].prev_user_ipfs_hash;
    else
      images[images[hash].next_user_ipfs_hash].prev_user_ipfs_hash = images[hash].prev_user_ipfs_hash;

    if(bytes(images[hash].prev_location_ipfs_hash).length != 0)
      images[images[hash].prev_location_ipfs_hash].next_location_ipfs_hash = images[hash].next_location_ipfs_hash;
    // if this was the most recent image
    if(bytes(images[hash].next_location_ipfs_hash).length == 0)
      location_images[images[hash].location] = images[hash].prev_location_ipfs_hash;
    else
      images[images[hash].next_location_ipfs_hash].prev_location_ipfs_hash = images[hash].prev_location_ipfs_hash;

    // so that this image does not get recognised when reinserted
    images[hash].ipfs_hash = "";
    deleted(hash);

  }

}