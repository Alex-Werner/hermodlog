import LOG_LEVELS from "../LOG_LEVELS.js";
import log from "../utils/log.js";
export default function debug(...args) {
    if(LOG_LEVELS[this.level] > LOG_LEVELS['debug']){
        return;
    }
    log('debug', args, this);
}
