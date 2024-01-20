import LOG_LEVELS from "../LOG_LEVELS.js";
import log from "../utils/log.js";
export default function fatal(...args) {
    if(LOG_LEVELS[this.level] > LOG_LEVELS['fatal']){
        return;
    }
    log('fatal', args, this);
}
