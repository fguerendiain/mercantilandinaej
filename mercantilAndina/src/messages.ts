import * as data from './messages.json';

export function get(property: string): any{
    return (<any>data)[property];
}

export function passDecoder(pass: string): any{
    return Buffer.from(pass, 'base64').toString('utf-8');
}
