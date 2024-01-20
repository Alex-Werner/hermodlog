import LOG_LEVELS from "../LOG_LEVELS.js";
import _log from "../utils/log.js";
export default function log(...args) {
    if(LOG_LEVELS[this.level] > LOG_LEVELS['info']){
        return;
    }
    _log('log', args, this);
}
