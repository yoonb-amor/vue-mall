import axios from 'axios';
import { Message } from 'element-ui';
import { DEFAULT_HTTP_URL,DEFAULT_ERROR_MESSAGE } from '../config/index'

const instance = axios.create({
    baseURL: DEFAULT_HTTP_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
});

export default async (...args) => {
    try {
        const result = await instance.post.call(null, ...args);
        let { data: response } = result;
        return response;
        // 兼容处理其他响应格式如字典项
        /*if (!('success' in response)) {
            response = { success: true, msg: '', data: response }
        }
        const { success, msg, ext } = response;
        if (!success) {
            Message.error(msg || DEFAULT_ERROR_MESSAGE);
        }
        return { success, msg, ext: ext || [] };*/
    } catch (e) {
        console && console.log(e);
        Message.error(e.message || DEFAULT_ERROR_MESSAGE);
    }
}
