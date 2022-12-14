import { Client } from 'undici'
import _ from 'lodash'

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError"; 
  }
}

const Cli = new Client('https://vlr-js.vercel.app');

export default async function getPage(path) {
    if (!path) throw Error("Parameter 'path' is required!")
    if (!_.isString(path)) throw ValidationError("Parameter 'path' is not a string!")
    if (!path.startsWith('/')) throw new ValidationError("Parameter 'path' must start with a forward slash --> /")
        
    const res = await Cli.request({
        method: 'GET',
        path
    });
    try {
        const r = await res.body.json();
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data,
            isError: () => r.type === 0,
            isForum: () => r.type === 1,
            isMatch: () => r.type === 2,
            isTeam: () => r.type === 3,
            isPlayer: () => r.type === 4,
            isRankings: () => r.type === 5,
            isMatches: () => r.type === 6,
        }
    } catch (e) {
        const r = await res.body.text();
        if (r) console.error(r)
        else throw e;
    }
}
export async function getMatches() {
    const res = await Cli.request({
        method: 'GET',
        path: '/matches'
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        const r = await res.body.text();
        if (r) console.error(r)
        else throw e;
    }
}
export async function getMatchResults(page) {
    if (page && _.isNumber(page) && page < 1) throw new ValidationError("Page parameter must be number greater than 0")
    if (page && _.isString(page) && _.isNumber(_.toNumber(page))) page = _.toNumber(page);
    else if (page) throw new ValidationError("Page parameter must be a number by itself OR a number in a string")
        
    const res = await Cli.request({
        method: 'GET',
        path: '/matches/results/',
        query: {
            page: page || 1
        }
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        try {
            const r = await res.body.text();
            if (r) console.error(r)
            else throw e;
        } catch (_e) {
            throw _e;
        }
    }
}
export async function getRankings(region) {
    if (region && _.isString(region)) throw new ValidationError('Region is not a string');
    const res = await Cli.request({
        method: 'GET',
        path: `/rankings/${region ? _.kebabCase(region) : ""}`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        try {
            const r = await res.body.text();
            if (r) console.error(r)
            else throw e;
        } catch (_e) {
            throw _e;
        }
    }
}
export async function getEvents(region) {
    if (region && _.isString(region)) throw new ValidationError('Region is not a string');
    const res = await Cli.request({
        method: 'GET',
        path: `/events/${region ? _.kebabCase(region) : ""}`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        try {
            const r = await res.body.text();
            if (r) console.error(r)
            else throw e;
        } catch (_e) {
            throw _e;
        }
    }
}
export async function getPlayers() {
    const res = await Cli.request({
        method: 'GET',
        path: `/players/other`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        try {
            const r = await res.body.text();
            if (r) console.error(r)
            else throw e;
        } catch (_e) {
            throw _e;
        }
    }
}
export async function getPlayer(id) {
    if (!_.isString(id) && !_.isNumber(id)) throw new ValidationError("Parameter 'id' is not a string or number")
    const res = await Cli.request({
        method: 'GET',
        path: typeof id === "string" && id.startsWith('/') ? `/player${id}` : `/player/${id}`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        try {
            const r = await res.body.text();
            if (r) console.error(r)
            else throw e;
        } catch (_e) {
            throw _e;
        }
    }
}
export async function getEvent(id) {
    if (!_.isString(id) && !_.isNumber(id)) throw new ValidationError("Parameter 'id' is not a string or number")
    const res = await Cli.request({
        method: 'GET',
        path: typeof id === "string" && id.startsWith('/') ? `/event${id}` : `/event/${id}`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        try {
            const r = await res.body.text();
            if (r) console.error(r)
            else throw e;
        } catch (_e) {
            throw _e;
        }
    }
}
export async function getTeam(id) {
    if (!_.isString(id) && !_.isNumber(id)) throw new ValidationError("Parameter 'id' is not a string or number");
    const res = await Cli.request({
        method: 'GET',
        path: typeof id === "string" && id.startsWith('/') ? `/team${id}` : `/team/${id}`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        try {
            const r = await res.body.text();
            if (r) console.error(r)
            else throw e;
        } catch (_e) {
            throw _e;
        }
    }
}