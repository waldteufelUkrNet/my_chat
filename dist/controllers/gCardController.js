const log=require("../libs/log")(module),objectId=require("mongodb").ObjectId,GroupChat=require("../models/groupchat.js").GroupChat,MonoChat=require("../models/monochat.js").MonoChat,User=require("../models/user.js").User;exports.leaveGroup=async function(e,n){const r=e.session.user._id,t=e.body.id;await GroupChat.findByIdAndUpdate(new objectId(t),{$pull:{interlocutors:r}}).catch(e=>{throw n.sendStatus(500),log.error("\nerr.name:\n    "+e.name+"\nerr.message:\n    "+e.message+"\nerr.stack:\n    "+e.stack),e}),await User.findByIdAndUpdate(new objectId(r),{$pull:{groupchats:t}}).catch(e=>{throw n.sendStatus(500),log.error("\nerr.name:\n    "+e.name+"\nerr.message:\n    "+e.message+"\nerr.stack:\n    "+e.stack),e}),n.sendStatus(200)},exports.deleteGroup=async function(e,n){const r=e.body.id;await User.updateMany({groupchats:r},{$pull:{groupchats:r}}).catch(e=>{throw n.sendStatus(500),log.error("\nerr.name:\n    "+e.name+"\nerr.message:\n    "+e.message+"\nerr.stack:\n    "+e.stack),e}),await GroupChat.findByIdAndDelete(new objectId(r)).catch(e=>{throw n.sendStatus(500),log.error("\nerr.name:\n    "+e.name+"\nerr.message:\n    "+e.message+"\nerr.stack:\n    "+e.stack),e}),n.sendStatus(200)},exports.removeHistory=async function(e,n){const r=e.session.user._id,t=e.body.id;let s=new Array;await GroupChat.findByIdAndUpdate(new objectId(t),{chat:s}).then(e=>e).catch(e=>{throw n.sendStatus(500),log.error("\nerr.name:\n    "+e.name+"\nerr.message:\n    "+e.message+"\nerr.stack:\n    "+e.stack),e})?n.sendStatus(200):await MonoChat.findOneAndUpdate({interlocutors:{$all:[r,t]}},{chat:s}).then(e=>{n.sendStatus(200)}).catch(e=>{throw n.sendStatus(500),log.error("\nerr.name:\n    "+e.name+"\nerr.message:\n    "+e.message+"\nerr.stack:\n    "+e.stack),e})};