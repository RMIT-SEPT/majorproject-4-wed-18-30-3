package labwed18303.demo.exceptions;

public class WorkerIDExceptionResponse {
    private String workerIdentifier;

    public WorkerIDExceptionResponse(String projectIdentifier) {
        this.workerIdentifier = projectIdentifier;
    }

    public String getWorkerIdentifier() {
        return workerIdentifier;
    }

    public void setWorkerIdentifier(String personIdentifier) {
        this.workerIdentifier = personIdentifier;
    }
}
