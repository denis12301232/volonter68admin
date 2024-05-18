import type { INews, IProject, IUser } from '@/types';

export namespace Auth {
  export namespace Login {
    export interface Body {
      login: string;
      password: string;
    }

    export interface Response {
      user: IUser;
      access: string;
      refresh: string;
    }
  }

  export namespace Registration {
    export interface Body {
      login: string;
      password: string;
    }

    export interface Response {
      user: IUser;
      access: string;
      refresh: string;
    }
  }

  export namespace Refresh {
    export interface Response {
      user: IUser;
      access: string;
      refresh: string;
    }
  }
}

export namespace News {
  export namespace Index {
    export interface Query {
      page: number;
      limit: number;
      sort?: string;
    }

    export interface Response {
      news: INews[];
      total: number;
    }
  }

  export namespace Create {
    export interface Body {
      title: string;
      reporter: string;
      content: string;
      date: string;
    }

    export interface Response {
      news: INews;
    }
  }

  export namespace Show {
    export interface Params {
      id: string;
    }
    export interface Response {
      news: INews;
    }
  }

  export namespace Update {
    export interface Params {
      id: string;
    }

    export interface Body {
      title?: string;
      reporter?: string;
      content?: string;
      date?: string;
      pinned?: boolean;
    }

    export interface Response {
      news: INews;
    }
  }
}

export namespace Project {
  export namespace Index {
    export interface Query {
      page: number;
      limit: number;
      sort?: string;
    }

    export interface Response {
      projects: IProject[];
      total: number;
    }
  }

  export namespace Create {
    export interface Body {
      title: string;
      content: string;
    }

    export interface Response {
      project: IProject;
    }
  }

  export namespace Show {
    export interface Params {
      id: string;
    }
    export interface Response {
      project: IProject;
    }
  }

  export namespace Update {
    export interface Params {
      id: string;
    }

    export interface Body {
      title?: string;
      content?: string;
    }
  }
}
