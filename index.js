const langs = require('./languages.js');
const AWS = require('aws-sdk');
const fs = require('fs');
this.config = {
    dir: './teste',
    language: 'en',
    region: 'us-east-1'
};

this.Polly = null;

exports.setConfig = function (config) {
    this.config = {
        dir: config.dir,
        language: config.language,
        region: config.region
    };
    return true;
}

exports.speak = async function (text) {
    const config = this.config
    createPolly(config)
    const people = getVoice(config.language);
    let params = {
        'Engine': people.engine,
        'Text': '<speak> ' + text + '</speak>',
        'OutputFormat': 'mp3',
        'VoiceId': people.voice,
        'TextType': 'ssml'
    }
    await Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                fs.writeFile("./audio.mp3", data.AudioStream, function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log('Sucess');
                })
            }
        }
    })
}

exports.speakWithOptions = async function (text = '', engine = '', voiceId = '') {
    const config = this.config
    createPolly(config)
    let params = {
        'Engine': engine,
        'Text': '<speak> ' + text + '</speak>',
        'OutputFormat': 'mp3',
        'VoiceId': voiceId,
        'TextType': 'ssml'
    }
    await Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                fs.writeFile("./audio.mp3", data.AudioStream, function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log('Sucess');
                })
            }
        }
    })
}

exports.speakNews = async function (text = '', language = '') {
    const config = this.config
    createPolly(config)

    const people = getVoice(language);

    if (typeof people == 'undefined') {
        console.log('Wrong language!')
        return false
    }

    let params = {
        'Engine': 'neural',
        'Text': '<speak><amazon:domain name="news"> ' + text + '</amazon:domain></speak>',
        'OutputFormat': 'mp3',
        'VoiceId': people.voice,
        'TextType': 'ssml'
    }

    await Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            if (err.code == 'ValidationException') {
                console.log('This voice does not support one of the used SSML features')
            } else {
                console.log(err.code)
            }
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                fs.writeFile("./audio.mp3", data.AudioStream, function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log('Sucess');
                })
            }
        }
    })
}

function getVoice(lang) {
    var voiceId = langs.langs.filter(element => {
        return element.name == lang
    }, lang)
    return voiceId[0];
}

function createPolly(config) {
    AWS.config.loadFromPath(config.dir);
    var region = config.region
    this.Polly = new AWS.Polly({
        signatureVersion: 'v4',
        region: region,
    })
}
