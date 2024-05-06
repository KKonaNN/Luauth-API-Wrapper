const axios = require('axios');

class Luauth {
    constructor(API_KEY) {
        this.#api_key = API_KEY;
        this.#base_url = 'https://api.luauth.io/v1';
        let checkApiKey = async () => {
            let response = await axios.get(`${this.#base_url}/keys/${this.#api_key}/details`);
            if (response.data.status === 'success') {
                return true;
            } else {
                return false;
            }
        }
        if (!checkApiKey()) {
            throw new Error('[Luauth Wrapper] Invalid API Key');
        }
        return this;
    }

    #api_key = null;
    #base_url = null;

    async getApiKeyDetails() {
        return await axios.get(`${this.#base_url}/keys/${this.#api_key}/details`, null, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });
    }

    async whitelistIdentifier(script_id, name, identifier, auth_expire) {
        if (!script_id || !identifier) throw new Error('[Luauth Wrapper] Missing required parameters');
        return await axios.post(`${this.#base_url}/whitelist/${script_id}`, {
            name: name,
            identifier: identifier,
            auth_expire: auth_expire
        }, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });
    }

    async unwhitelistIdentifier(script_id, identifier) {
        if (!script_id || !identifier) throw new Error('[Luauth Wrapper] Missing required parameters');
        return await axios.delete(`${this.#base_url}/whitelist/${script_id}/${identifier}`, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });
    }

    async unbanIp(script_id, identifier) {
        if (!script_id || !identifier) throw new Error('[Luauth Wrapper] Missing required parameters');
       
        let getUnbanToken = await axios.get(`${this.#base_url}/whitelist/${script_id}/${identifier}`, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });

        let unbanToken = getUnbanToken.data.unban_token;
        return await axios.get(`${this.#base_url}/unban/${script_id}?token=${unbanToken}`, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });
    }

    async getDetails(script_id, identifier) {
        if(!script_id || !identifier) throw new Error('[Luauth Wrapper] Missing required parameters');
        return await axios.get(`${this.#base_url}/whitelist/${script_id}/${identifier}`, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });
    }

    async getIdentifiers(script_id) {
        if (!script_id) throw new Error('[Luauth Wrapper] Missing required parameters');
        return await axios.get(`${this.#base_url}/whitelist/${script_id}`, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });
    }

    async createScript(script_name, platform, script, logs_webhook, alerts_webhook, ffa, silent) {
        if (platform !== "roblox" && platform !== "fivem" && platform !== "csgo") throw new Error("Invalid platform")
        if (!script_name || !platform || !script || !logs_webhook || !alerts_webhook) throw new Error('[Luauth Wrapper] Missing required parameters');  
        return await axios.post(`${this.#base_url}/create`, {
            script_name: script_name,
            platform: platform,
            script: script,
            logs_webhook: logs_webhook,
            alerts_webhook: alerts_webhook,
            ffa: ffa,
            silent: silent
        }, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });
    }

    async updateScript(script_id, script, logs_webhook, alerts_webhook, ffa, silent) {
        if (!script_id || !script || !logs_webhook || !alerts_webhook) throw new Error('[Luauth Wrapper] Missing required parameters');  
        return await axios.put(`${this.#base_url}/scripts/${script_id}`, {
            file: script,
            logs_webhook: logs_webhook,
            alerts_webhook: alerts_webhook,
            ffa: ffa,
            silent: silent
        }, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });
    }

    async deleteScript(script_id) {
        if (!script_id) throw new Error('[Luauth Wrapper] Missing required parameters');
        return await axios.delete(`${this.#base_url}/scripts/${script_id}`, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        });
    }

    async getLoader(script_id) {
        if (!script_id) throw new Error('[Luauth Wrapper] Missing required parameters');
        return await axios.get(`https://api.luauth.io/files/v1/l/${script_id}.lua`, null, {
            headers: {
                'Authorization': this.#api_key,
                'Content-Type': 'application/json'
            }
        })
    }
}

Luauth.login = (api_key) => new Luauth(api_key);

module.exports = Luauth;