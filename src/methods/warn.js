import LOG_LEVELS from "../LOG_LEVELS.js";
import log from "../utils/log.js";
export default function warn(...args) {
    if(LOG_LEVELS[this.level] > LOG_LEVELS['warn']){
        return;
    }
    log('warn', args, this);
}
