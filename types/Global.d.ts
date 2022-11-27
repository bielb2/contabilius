type ValueOf<T> = T[keyof T];

type HttpClientErrorStatus = 400  | 401  | 402  | 403  | 404  | 405  | 406  | 407  | 408  | 410  | 411  | 413  | 414  | 415  | 416  | 417  | 418  | 421  | 422  | 423  | 424  | 426  | 428  | 429  | 431  | 451;

type HttpServerErrorStatus = 500 | 501 | 502 | 503 | 504 | 505 | 507 | 508 | 510 | 511;
type HttpErrorStatus = HttpClientErrorStatus | HttpServerErrorStatus;
type GenericResponse<T> = Promise<T | { status: HttpErrorStatus; message: string }>;

// Just a hack to following ts error: "is not a valid async function return type in ES5/ES3 because it does not refer to a Promise-compatible constructor value"
const GenericResponse = Promise;