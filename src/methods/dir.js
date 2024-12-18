import LOG_LEVELS from "../LOG_LEVELS.js";
import log from "../utils/log.js";

export default function dir(label, object) {
    if(LOG_LEVELS[this.level] > LOG_LEVELS['info']){
        return;
    }
    log('log', [label], this);
    console.dir(object, { depth: 1, colors: true });
} 