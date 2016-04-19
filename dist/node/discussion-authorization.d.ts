/***************************************************************
 * DiscussionAuthorization represent all the right you can have
 * in a discussion.
 ***************************************************************/
export interface DiscussionAuthorization {
    write: boolean;
    talk: boolean;
    video: boolean;
    invite: boolean;
    kick: boolean;
    ban: boolean;
}
