export class SubmissionResult {
  public stdout: string;
  public time: string;
  public memory: string;
  public stderr: string;
  public token: string;
  public compile_output: string;
  public message: string;
  public status: Status;

  constructor(stdout: string, time: string, memory: string, stderr: string, token: string, compile_output: string, message: string, status: Status) {
    this.stdout = stdout;
    this.time = time;
    this.memory = memory;
    this.stderr = stderr;
    this.token = token;
    this.compile_output = compile_output;
    this.message = message;
    this.status = status;
  }
}

export class Status {
  public id: number;
  public description: string;

  constructor(id: number, description: string) {
    this.id = id;
    this.description = description;
  }
}
