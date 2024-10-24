import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // all messages

    if(!conversation) {
        return res.status(200).json([])
    }

    const messages = conversation.messages
    res.status(200).json(messages)

  } catch (error) {
    console.log("Error in getMessageController", error.message);

    res.status(401).json(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }


    // await conversation.save();
    // await newMessage.save();

    // will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

        //SOCKET IO Functionality
      const receiverSocketid = getReceiverSocketId(receiverId)
      if(receiverSocketid) {
        //to specific user
        io.to(receiverSocketid).emit("newMessage", newMessage)
      }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessageController", error.message);
    res.status(401).json(error);
  }
};
