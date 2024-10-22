import { DefaultSessionState, Session } from "better-sse";

const sessionsMap = new Map<string, Session<DefaultSessionState>>();

export function addSseSession(sessionId: string, userSession: Session<DefaultSessionState>){

    sessionsMap.set(sessionId, userSession);
}

export function removeSseSession(sessionId: string){

    sessionsMap.delete(sessionId);
}

export function pushSseEventMany(data: any, eventName: string){

    for (let [id, session] of sessionsMap) {
        
        if(session.isConnected){
            session.push(data, eventName);
        }
        else {
            sessionsMap.delete(id);
        }
    }
}