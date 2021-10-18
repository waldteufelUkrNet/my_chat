const winston=require("winston"),ENV=process.env.NODE_ENV;function getLogger(e){let n=e.filename;n.includes("\\")?n=n.split("\\").slice(-2).join("/"):n.includes("/")&&(n=n.split("/").slice(-2).join("/"));const{format:o}=winston,{combine:t,timestamp:l,label:s,printf:r}=o,i=r(({level:e,message:n,label:o,timestamp:t})=>`${t} [${o}] ${e}: ${n}`),a=r(({level:e,message:n,label:o,timestamp:t})=>`[${o}] ${e}: ${n}`);let m=[new winston.transports.Console({level:"development"==ENV?"debug":"error",format:winston.format.combine(s({label:n}),winston.format.colorize(),a)}),new winston.transports.File({filename:"logs/debug.log",level:"debug",format:winston.format.combine(s({label:n}),l(),i)}),new winston.transports.File({filename:"logs/error.log",level:"error",format:winston.format.combine(s({label:n}),l(),i)})];return new winston.createLogger({transports:m})}module.exports=getLogger;