# AWS POLLY NODE EASILY
 Use AWS POLLY easily 

## Installation

The first thing that you had to do is install the `npm package` :

```bash
npm i --save aws-polly-node
```

## AWS CREDENTIALS

The second thing you need to create a json file with your amazon credentials.

Open the [IAM console](https://console.aws.amazon.com/iam/)

```
To get your access key ID and secret access key

1- On the navigation menu, choose Users.

2- Choose your IAM user name (not the check box).

3- Open the Security credentials tab, and then choose Create access key.

4- To see the new access key, choose Show. Your credentials resemble the following:

 Access key ID: AKIAIOSFODNN7EXAMPLE
 Secret access key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

```
Your file should be like this:

```json
{ 
"accessKeyId": "AKIAIOSFODNN7EXAMPLE",
"secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
"region": "us-east-1"
}
```



## USAGE

```javascript
const pollynode = require('aws-polly-node');

async function speaking() {
    await pollynode.setConfig({
        dir: './config.json',
        language: 'pt',
        region: 'us-east-1'
    });

    //Speak with configuration saved.
    await pollynode.speak(text);

    //Speak with some options 
    // Text : your text do TTS
    // Engine : neural or standard
    // VoiceID : see some voicesID here: https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
    await pollynode.speakWithOptions(text,engine,voiceId)

    //Speak with neural newscaster speaking style
    await pollynode.speakNews(text, language)
}

```

## SOME LANGUAGES OPTIONS

```csv
| language | voiceId    |   engine     |
| ------------------------------------ |
|    pt    |  Camila    |  Neural      |
|    gb    |  Amy       |  Neural      |
|    gbm   |  Brian     |  Neural      |
|    au    |  Olivia    |  Neural      |
|    za    |  Ayanda    |  Neural      |
|    en    |  Joanna    |  Neural      | 
|    enk   |  Ivy       |  Neural      |
|    enm   |  Matthew   |  Neural      |
|    enmk  |  Kevin     |  Neural      |
|    fr    |  Léa       |  Neural      |
|    it    |  Bianca    |  Neural      |
|    jpm   |  Takumi    |  Neural      |
|    ko    |  Seoyeon   |  Neural      |
|    es    |  Lucia     |  Neural      |
|    esn   |  Lupe      |  Neural      |
|    ptm   |  Ricardo   |  Standard    |
|    jp    |  Mizuki    |  Standard    |
|    arb   |  Zeina     |  Standard    |
|    cmn   |  Zhiyu     |  Standard    |
|    da    |  Naja      |  Standard    |
|    dam   |  Mads      |  Standard    |
|    nl    |  Lotte     |  Standard    |
|    nlm   |  Ruben     |  Standard    |
|    ein   |  Raveena   |  Standard    |
|    de    |  Vicki     |  Standard    |
|    itm   |  Giorgio   |  Standard    |
|    za    |  Ayanda    |  Standard    |
```

