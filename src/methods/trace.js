import LOG_LEVELS from "../LOG_LEVELS.js";
import log from "../utils/log.js";
export default function trace(...args) {
    if(LOG_LEVELS[this.level] > LOG_LEVELS['trace']){
        return;
    }
    log('trace', args, this);
}
