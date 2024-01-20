import LOG_LEVELS from "../LOG_LEVELS.js";
import log from "../utils/log.js";
export default function info(...args) {
    if(LOG_LEVELS[this.level] > LOG_LEVELS['info']){
        return;
    }
    log('info', args, this);
}
