"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushSseEventMany = exports.removeSseSession = exports.addSseSession = void 0;
const sessionsMap = new Map();
function addSseSession(sessionId, userSession) {
    sessionsMap.set(sessionId, userSession);
}
exports.addSseSession = addSseSession;
function removeSseSession(sessionId) {
    sessionsMap.delete(sessionId);
}
exports.removeSseSession = removeSseSession;
function pushSseEventMany(data, eventName) {
    for (let [id, session] of sessionsMap) {
        if (session.isConnected) {
            session.push(data, eventName);
        }
        else {
            sessionsMap.delete(id);
        }
    }
}
exports.pushSseEventMany = pushSseEventMany;
