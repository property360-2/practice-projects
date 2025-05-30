// 1. Define projectStatus constant
const projectStatus = {
    PENDING: { description: "Pending Execution" },
    SUCCESS: { description: "Executed Successfully" },
    FAILURE: { description: "Execution Failed" }
  };
  
  // 2. Define ProjectIdea class
  class ProjectIdea {
    constructor(title, description) {
      this.title = title;
      this.description = description;
      this.status = projectStatus.PENDING; // Default status
    }
  
    updateProjectStatus(newStatus) {
      this.status = newStatus;
    }
  }
  
  // 3. Define ProjectIdeaBoard class
  class ProjectIdeaBoard {
    constructor(title) {
      this.title = title;
      this.ideas = [];
    }
  
    pin(projectIdea) {
      this.ideas.push(projectIdea);
    }
  
    unpin(projectIdea) {
      this.ideas = this.ideas.filter(idea => idea !== projectIdea);
    }
  
    count() {
      return this.ideas.length;
    }
  
    formatToString() {
      return this.ideas.map(idea =>
        `Title: ${idea.title}\nDescription: ${idea.description}\nStatus: ${idea.status.description}`
      ).join("\n\n");
    }
  }
F  