"use strict";
/***************************************************************
 * MSG_FLAG constants are flags that are used to help us sending
 * messages with different protocols (with Proxies).
 * Whatever the messages content, text will always be send,
 * even if the message does not contain any text. So every
 * protocols will always be able to send something.
 ***************************************************************/
exports.MSG_FLAG_TXT = 0x0001; //  The message contains text
exports.MSG_FLAG_IMG = 0x0002; //  The message contains picture(s)
exports.MSG_FLAG_VID = 0x0004; //  The message contains video(s)
exports.MSG_FLAG_FIL = 0x0008; //  The message contains other file(s)
exports.MSG_FLAG_URL = 0x0010; //  The message contains an URL
exports.MSG_FLAG_EDI = 0x0100; //  The message is editable
