/* ==========================================================
   QUIZ DATA – 60 domande: Docker, Immagini, K8s, Microservizi
   ========================================================== */
const questions = [
  // ---- DOCKER (1-15) ----
  {
    id: 1,
    topic: "Docker",
    question: "Che cos'è Docker?",
    answers: [
      "Un sistema di virtualizzazione completo con proprio kernel",
      "Una piattaforma per creare, distribuire ed eseguire applicazioni in container",
      "Un linguaggio di programmazione per cloud",
      "Un database distribuito"
    ],
    correct: 1
  },
  {
    id: 2,
    topic: "Docker",
    question: "Quale file definisce come costruire un'immagine Docker?",
    answers: [
      "docker-compose.yml",
      "Dockerfile",
      "docker.config",
      "container.json"
    ],
    correct: 1
  },
  {
    id: 3,
    topic: "Docker",
    question: "Quale comando avvia un container da un'immagine?",
    answers: [
      "docker build",
      "docker start",
      "docker run",
      "docker exec"
    ],
    correct: 2
  },
  {
    id: 4,
    topic: "Docker",
    question: "Cosa fa 'docker ps'?",
    answers: [
      "Mostra le immagini presenti",
      "Elenca i container in esecuzione",
      "Mostra i log del container",
      "Avvia un nuovo processo"
    ],
    correct: 1
  },
  {
    id: 5,
    topic: "Docker",
    question: "Cosa fa il flag '-d' in 'docker run -d nginx'?",
    answers: [
      "Elimina il container dopo l'esecuzione",
      "Avvia il container in modalità interattiva",
      "Avvia il container in background (detached)",
      "Assegna un nome al container"
    ],
    correct: 2
  },
  {
    id: 6,
    topic: "Docker",
    question: "Qual è la differenza tra un'immagine e un container?",
    answers: [
      "Sono la stessa cosa",
      "L'immagine è il template, il container è l'istanza eseguita",
      "Il container è il template, l'immagine è l'istanza",
      "L'immagine contiene solo il kernel, il container l'app"
    ],
    correct: 1
  },
  {
    id: 7,
    topic: "Docker",
    question: "Cosa fa 'docker build -t myapp .'?",
    answers: [
      "Esegue myapp in background",
      "Costruisce un'immagine dal Dockerfile e la tagga 'myapp'",
      "Cerca l'immagine myapp su Docker Hub",
      "Elimina l'immagine myapp"
    ],
    correct: 1
  },
  {
    id: 8,
    topic: "Docker",
    question: "Cosa fa l'istruzione 'EXPOSE 8080' in un Dockerfile?",
    answers: [
      "Pubblica automaticamente la porta 8080 sull'host",
      "Documenta che il container ascolta sulla porta 8080",
      "Apre un firewall sulla porta 8080",
      "Espone la porta solo in fase di build"
    ],
    correct: 1
  },
  {
    id: 9,
    topic: "Docker",
    question: "Come si mappa la porta 80 del container alla 8080 dell'host?",
    answers: [
      "docker run -p 80:8080 nginx",
      "docker run -p 8080:80 nginx",
      "docker run --port 8080:80 nginx",
      "docker run -e PORT=8080 nginx"
    ],
    correct: 1
  },
  {
    id: 10,
    topic: "Docker",
    question: "Cosa fa 'docker-compose up'?",
    answers: [
      "Esegue un solo container Docker",
      "Avvia più container definiti in un file docker-compose.yml",
      "Aggiorna tutte le immagini sul sistema",
      "Carica un file di configurazione di Kubernetes"
    ],
    correct: 1
  },
  {
    id: 11,
    topic: "Docker",
    question: "Cosa sono i volumi in Docker?",
    answers: [
      "Spazio di swap riservato al container",
      "Meccanismo per persistere dati oltre il ciclo di vita del container",
      "Partizioni del disco rigido",
      "File temporanei di build"
    ],
    correct: 1
  },
  {
    id: 12,
    topic: "Docker",
    question: "Cosa fa 'docker logs <container>'?",
    answers: [
      "Mostra la cronologia dei comandi eseguiti",
      "Mostra i log stdout/stderr del container",
      "Mostra i file all'interno del container",
      "Registra l'immagine in un registro"
    ],
    correct: 1
  },
  {
    id: 13,
    topic: "Docker",
    question: "Cosa fa 'docker exec -it <container> bash'?",
    answers: [
      "Esegue un comando bash in un nuovo container",
      "Avvia una shell interattiva dentro un container in esecuzione",
      "Esegue bash sull'host",
      "Installa bash nel container"
    ],
    correct: 1
  },
  {
    id: 14,
    topic: "Docker",
    question: "Quale rete Docker permette a ogni container di comunicare con tutti gli altri?",
    answers: [
      "bridge (default)",
      "host",
      "none",
      "overlay"
    ],
    correct: 0
  },
  {
    id: 15,
    topic: "Docker",
    question: "Cos'è Docker Hub?",
    answers: [
      "Un servizio di hosting per repository Git",
      "Un registro pubblico di immagini Docker",
      "Un tool di monitoring per container",
      "Un plugin per IDE"
    ],
    correct: 1
  },

  // ---- IMMAGINI DOCKER (16-25) ----
  {
    id: 16,
    topic: "Immagini",
    question: "Quale istruzione in un Dockerfile definisce l'immagine di base?",
    answers: [
      "BASE",
      "FROM",
      "START",
      "IMAGE"
    ],
    correct: 1
  },
  {
    id: 17,
    topic: "Immagini",
    question: "Cosa fa l'istruzione 'RUN apt-get update' in un Dockerfile?",
    answers: [
      "Esegue il comando durante l'esecuzione del container",
      "Esegue il comando durante la costruzione dell'immagine",
      "Aggiorna il Docker Engine",
      "Scarica l'immagine base"
    ],
    correct: 1
  },
  {
    id: 18,
    topic: "Immagini",
    question: "Qual è lo scopo dell'istruzione 'CMD' in un Dockerfile?",
    answers: [
      "Eseguire un comando durante la build",
      "Fornire il comando predefinito quando il container viene avviato",
      "Copiare file nell'immagine",
      "Definire una variabile d'ambiente"
    ],
    correct: 1
  },
  {
    id: 19,
    topic: "Immagini",
    question: "Differenza tra 'CMD' ed 'ENTRYPOINT'?",
    answers: [
      "Sono identici",
      "CMD fornisce argomenti di default, ENTRYPOINT definisce l'eseguibile principale",
      "ENTRYPOINT viene eseguito solo in fase di build",
      "CMD viene ignorato se ENTRYPOINT è presente"
    ],
    correct: 1
  },
  {
    id: 20,
    topic: "Immagini",
    question: "Cosa fa l'istruzione 'COPY' in un Dockerfile?",
    answers: [
      "Scarica file da internet",
      "Copia file dalla build context nell'immagine",
      "Copia file tra due container",
      "Copia file dal container all'host"
    ],
    correct: 1
  },
  {
    id: 21,
    topic: "Immagini",
    question: "A cosa serve il file '.dockerignore'?",
    answers: [
      "Ignorare i container in esecuzione",
      "Escludere file/directory dalla build context di Docker",
      "Nascondere i log di build",
      "Disabilitare il caching delle immagini"
    ],
    correct: 1
  },
  {
    id: 22,
    topic: "Immagini",
    question: "Cosa sono i layer in un'immagine Docker?",
    answers: [
      "Partizioni di rete",
      "Snapshot del filesystem generati da ogni istruzione del Dockerfile",
      "Versioni del Docker Engine",
      "Directory di configurazione"
    ],
    correct: 1
  },
  {
    id: 23,
    topic: "Immagini",
    question: "Come si riduce la dimensione di un'immagine Docker?",
    answers: [
      "Aumentando il numero di FROM",
      "Usando immagini base alpine/slim e ottimizzando i layer",
      "Aggiungendo più RUN",
      "Usando immagini con kernel completo"
    ],
    correct: 1
  },
  {
    id: 24,
    topic: "Immagini",
    question: "A cosa serve 'docker pull'?",
    answers: [
      "Caricare un'immagine su Docker Hub",
      "Scaricare un'immagine da un registro",
      "Estrarre un container da un archivio",
      "Aggiornare il Docker Engine"
    ],
    correct: 1
  },
  {
    id: 25,
    topic: "Immagini",
    question: "Cos'è una multi-stage build?",
    answers: [
      "Una build che usa più Dockerfile",
      "Una build con più FROM che produce immagini finali più piccole",
      "Un build parallelo di più immagini",
      "Una build con più container"
    ],
    correct: 1
  },

  // ---- KUBERNETES (26-45) ----
  {
    id: 26,
    topic: "Kubernetes",
    question: "Che cos'è Kubernetes?",
    answers: [
      "Un sistema di containerizzazione",
      "Una piattaforma per orchestrare container su cluster di nodi",
      "Un database per cluster",
      "Un linguaggio di scripting per cloud"
    ],
    correct: 1
  },
  {
    id: 27,
    topic: "Kubernetes",
    question: "Cos'è un Pod in Kubernetes?",
    answers: [
      "Un gruppo di container che condividono risorse di rete e storage",
      "Un singolo container isolato",
      "Un nodo worker del cluster",
      "Un servizio di bilanciamento"
    ],
    correct: 0
  },
  {
    id: 28,
    topic: "Kubernetes",
    question: "Cos'è un Deployment in Kubernetes?",
    answers: [
      "Un modo per esporre un Pod all'esterno",
      "Un controller che gestisce il ciclo di vita dei Pod (scaling, rollback)",
      "Una risorsa per memorizzare dati persistenti",
      "Un tipo di servizio di rete"
    ],
    correct: 1
  },
  {
    id: 29,
    topic: "Kubernetes",
    question: "Cos'è un Service in Kubernetes?",
    answers: [
      "Un container speciale per logging",
      "Un'astrazione che espone i Pod su una rete stabile",
      "Un comando per avviare i Pod",
      "Un tipo di volume persistente"
    ],
    correct: 1
  },
  {
    id: 30,
    topic: "Kubernetes",
    question: "Quale strumento si usa per interagire con un cluster Kubernetes?",
    answers: [
      "docker-cli",
      "kubectl",
      "kubeadm",
      "helm"
    ],
    correct: 1
  },
  {
    id: 31,
    topic: "Kubernetes",
    question: "Cosa fa 'kubectl get pods'?",
    answers: [
      "Crea un nuovo pod",
      "Elenca tutti i pod nel namespace corrente",
      "Elimina tutti i pod",
      "Mostra i log dei pod"
    ],
    correct: 1
  },
  {
    id: 32,
    topic: "Kubernetes",
    question: "Cosa fa 'kubectl apply -f deploy.yaml'?",
    answers: [
      "Applica la configurazione definita nel file YAML al cluster",
      "Elimina le risorse nel file YAML",
      "Mostra il contenuto del file",
      "Scarica il file dal cluster"
    ],
    correct: 0
  },
  {
    id: 33,
    topic: "Kubernetes",
    question: "Cos'è un Namespace in Kubernetes?",
    answers: [
      "Una partizione logica del cluster per isolare risorse",
      "Un nome assegnato a ogni Pod",
      "Un tipo di volume",
      "Un DNS interno"
    ],
    correct: 0
  },
  {
    id: 34,
    topic: "Kubernetes",
    question: "Cos'è un Ingress in Kubernetes?",
    answers: [
      "Un controller che gestisce il traffico HTTP/S esterno verso i Service",
      "Un tipo di Pod temporaneo",
      "Un metodo per fare SSH nei container",
      "Un modo per salvare file di configurazione"
    ],
    correct: 0
  },
  {
    id: 35,
    topic: "Kubernetes",
    question: "Cosa fa 'kubectl scale deployment myapp --replicas=5'?",
    answers: [
      "Elimina il deployment",
      "Porta a 5 il numero di repliche del deployment myapp",
      "Riavvia il deployment myapp",
      "Mostra le statistiche"
    ],
    correct: 1
  },
  {
    id: 36,
    topic: "Kubernetes",
    question: "Cosa sono i ConfigMap in Kubernetes?",
    answers: [
      "Mappe di rete per i Service",
      "Oggetti che memorizzano dati di configurazione non sensibili",
      "Mappe delle porte dei container",
      "Log di configurazione del cluster"
    ],
    correct: 1
  },
  {
    id: 37,
    topic: "Kubernetes",
    question: "Cosa sono i Secret in Kubernetes?",
    answers: [
      "Password o token memorizzati in modo cifrato",
      "File di log segreti",
      "Container nascosti",
      "Namespace privati"
    ],
    correct: 0
  },
  {
    id: 38,
    topic: "Kubernetes",
    question: "Cos'è un PersistentVolume (PV)?",
    answers: [
      "Un volume con ciclo di vita indipendente dai Pod",
      "Un volume temporaneo cancellato con il Pod",
      "Un'area di swap",
      "Una risorsa di CPU riservata"
    ],
    correct: 0
  },
  {
    id: 39,
    topic: "Kubernetes",
    question: "Quale componente di Kubernetes gestisce il bilanciamento del carico tra i nodi?",
    answers: [
      "kube-scheduler",
      "kube-controller-manager",
      "kube-proxy",
      "etcd"
    ],
    correct: 2
  },
  {
    id: 40,
    topic: "Kubernetes",
    question: "Quale componente memorizza lo stato del cluster Kubernetes?",
    answers: [
      "kube-apiserver",
      "etcd",
      "kubelet",
      "kube-scheduler"
    ],
    correct: 1
  },
  {
    id: 41,
    topic: "Kubernetes",
    question: "Cos'è l'Horizontal Pod Autoscaler (HPA)?",
    answers: [
      "Uno strumento che ridimensiona automaticamente il numero di Pod in base al carico",
      "Un tipo di Service speciale",
      "Un controller per distribuire le immagini",
      "Un database orizzontale"
    ],
    correct: 0
  },
  {
    id: 42,
    topic: "Kubernetes",
    question: "Cosa fa 'kubectl describe pod my-pod'?",
    answers: [
      "Elimina il pod",
      "Mostra informazioni dettagliate sullo stato del pod",
      "Crea un pod identico",
      "Modifica il pod my-pod"
    ],
    correct: 1
  },
  {
    id: 43,
    topic: "Kubernetes",
    question: "Cosa fa 'kubectl logs my-pod'?",
    answers: [
      "Mostra i log del pod my-pod",
      "Avvia un logging interattivo",
      "Mostra la cronologia dei comandi kubectl",
      "Scarica i log sul filesystem"
    ],
    correct: 0
  },
  {
    id: 44,
    topic: "Kubernetes",
    question: "Cos'è Helm?",
    answers: [
      "Un motore di container alternativo",
      "Un package manager per Kubernetes che semplifica il deploy di applicazioni",
      "Un tipo di Service",
      "Un DNS cluster"
    ],
    correct: 1
  },
  {
    id: 45,
    topic: "Kubernetes",
    question: "Cosa rappresenta un nodo 'Master' in Kubernetes?",
    answers: [
      "Il nodo che esegue le applicazioni",
      "Il nodo che gestisce il cluster (API server, scheduler, controller-manager)",
      "Il nodo con più risorse",
      "Un nodo di backup"
    ],
    correct: 1
  },

  // ---- MICROSERVIZI (46-60) ----
  {
    id: 46,
    topic: "Microservizi",
    question: "Che cos'è un'architettura a microservizi?",
    answers: [
      "Un'applicazione monolitica divisa in funzioni",
      "Un insieme di servizi indipendenti, ognuno con un proprio dominio e deployabili separatamente",
      "Un database distribuito su più server",
      "Una tecnica per ridurre il numero di server"
    ],
    correct: 1
  },
  {
    id: 47,
    topic: "Microservizi",
    question: "Qual è il principale vantaggio dei microservizi rispetto al monolite?",
    answers: [
      "Minor numero di file",
      "Scalabilità indipendente, deploy separati, isolamento dei guasti",
      "Migliori prestazioni di rete",
      "Nessuna necessità di API"
    ],
    correct: 1
  },
  {
    id: 48,
    topic: "Microservizi",
    question: "Quale svantaggio è comune nei microservizi?",
    answers: [
      "Difficoltà di deployment",
      "Complessità di comunicazione e orchestrazione tra servizi",
      "Codice meno modulare",
      "Minor scalabilità"
    ],
    correct: 1
  },
  {
    id: 49,
    topic: "Microservizi",
    question: "Quale protocollo è spesso usato per la comunicazione tra microservizi?",
    answers: [
      "FTP",
      "HTTP/REST o gRPC",
      "SMTP",
      "SNMP"
    ],
    correct: 1
  },
  {
    id: 50,
    topic: "Microservizi",
    question: "Cos'è un API Gateway?",
    answers: [
      "Un database per API",
      "Un punto di ingresso unico che instrada le richieste ai vari microservizi",
      "Un tool per creare API",
      "Un Service di Kubernetes"
    ],
    correct: 1
  },
  {
    id: 51,
    topic: "Microservizi",
    question: "Cosa si intende per 'Service Discovery'?",
    answers: [
      "La pubblicazione di API pubbliche",
      "Il meccanismo con cui i servizi si trovano e comunicano tra loro dinamicamente",
      "La scoperta di bug nei servizi",
      "Un test di integrazione"
    ],
    correct: 1
  },
  {
    id: 52,
    topic: "Microservizi",
    question: "Cosa significa 'bounded context' nel contesto dei microservizi?",
    answers: [
      "Un contesto di esecuzione limitato",
      "Un confine esplicito attorno a un dominio, con un proprio modello e linguaggio",
      "Una sandbox per il codice",
      "Un limite di repliche"
    ],
    correct: 1
  },
  {
    id: 53,
    topic: "Microservizi",
    question: "Cos'è il 'Circuit Breaker' pattern?",
    answers: [
      "Un interruttore fisico per i server",
      "Un meccanismo per evitare chiamate a servizi non funzionanti, aprendo il circuito",
      "Un tipo di bilanciatore di carico",
      "Un firewall per microservizi"
    ],
    correct: 1
  },
  {
    id: 54,
    topic: "Microservizi",
    question: "Cosa si intende per 'event-driven' nei microservizi?",
    answers: [
      "Servizi che comunicano tramite eventi asincroni (es. Kafka, RabbitMQ)",
      "Servizi che girano solo su eventi programmati",
      "Un database event-store",
      "Un tipo di API REST"
    ],
    correct: 0
  },
  {
    id: 55,
    topic: "Microservizi",
    question: "Cosa sono i 'container' nel contesto dei microservizi?",
    answers: [
      "Un modo per virtualizzare l'intero sistema operativo",
      "Un'unità leggera che impacchetta un servizio con le sue dipendenze",
      "Un database NoSQL",
      "Un tipo di API"
    ],
    correct: 1
  },
  {
    id: 56,
    topic: "Microservizi",
    question: "Qual è la differenza principale tra SOA e microservizi?",
    answers: [
      "Sono la stessa cosa",
      "SOA usa un bus enterprise (ESB) mentre i microservizi preferiscono API leggere e decentralizzate",
      "I microservizi sono più grandi",
      "SOA non usa container"
    ],
    correct: 1
  },
  {
    id: 57,
    topic: "Microservizi",
    question: "Cosa si intende per 'deploy indipendente'?",
    answers: [
      "Ogni microservizio può essere aggiornato senza fermare l'intero sistema",
      "I microservizi girano su server diversi",
      "Il deploy richiede un ticket separato",
      "Solo un servizio alla volta può essere deployato"
    ],
    correct: 0
  },
  {
    id: 58,
    topic: "Microservizi",
    question: "Cos'è la 'resilienza' in un sistema a microservizi?",
    answers: [
      "La capacità di resistere a tutti gli attacchi hacker",
      "La capacità di continuare a funzionare (anche parzialmente) quando alcuni servizi falliscono",
      "La velocità di risposta del sistema",
      "Un pattern di deploy"
    ],
    correct: 1
  },
  {
    id: 59,
    topic: "Microservizi",
    question: "Quale strumento è comune per gestire la configurazione distribuita?",
    answers: [
      "Docker Compose",
      "Consul, etcd o Spring Cloud Config",
      "kubectl",
      "Git"
    ],
    correct: 1
  },
  {
    id: 60,
    topic: "Microservizi",
    question: "Cosa si intende per 'CQRS' (Command Query Responsibility Segregation)?",
    answers: [
      "Separare le operazioni di lettura da quelle di scrittura su modelli e database diversi",
      "Unire le query in un unico comando",
      "Un pattern per il logging",
      "Un metodo di autenticazione"
    ],
    correct: 0
  }
];

/* ==========================================================
   QUIZ LOGIC
   ========================================================== */
const letters = ["A", "B", "C", "D"];
const state = {
  current: 0,
  answers: new Array(questions.length).fill(null),
  flagged: new Array(questions.length).fill(false),
  reviewed: false
};

const screens = {
  intro: document.getElementById("intro-screen"),
  quiz: document.getElementById("quiz-screen"),
  results: document.getElementById("results-screen"),
  review: document.getElementById("review-screen")
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function renderQuestion() {
  const q = questions[state.current];
  document.getElementById("question-counter").textContent = state.current + 1 + " / " + questions.length;
  document.getElementById("topic-badge").textContent = q.topic;
  document.getElementById("progress-bar").style.width = ((state.current + 1) / questions.length * 100) + "%";
  document.getElementById("question-text").textContent = q.question;

  const flagBtn = document.getElementById("flag-btn");
  flagBtn.classList.toggle("flagged", state.flagged[state.current]);

  const container = document.getElementById("answers-container");
  container.innerHTML = "";

  q.answers.forEach((text, i) => {
    const div = document.createElement("div");
    div.className = "answer-option";
    if (state.answers[state.current] === i) div.classList.add("selected");
    div.innerHTML = "<span class=\"letter\">" + letters[i] + "</span><span>" + text + "</span>";
    div.addEventListener("click", function() { selectAnswer(i); });
    container.appendChild(div);
  });

  document.getElementById("prev-btn").disabled = state.current === 0;
  const nextBtn = document.getElementById("next-btn");
  if (state.current === questions.length - 1) {
    nextBtn.textContent = "🏁 Mostra Risultato";
  } else {
    nextBtn.textContent = "Successiva →";
  }
}

function selectAnswer(index) {
  if (state.reviewed) return;
  state.answers[state.current] = index;
  document.querySelectorAll(".answer-option").forEach(function(el, i) {
    el.classList.toggle("selected", i === index);
  });
}

function nextQuestion() {
  if (state.current < questions.length - 1) {
    state.current++;
    renderQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (state.current > 0) {
    state.current--;
    renderQuestion();
  }
}

function toggleFlag() {
  state.flagged[state.current] = !state.flagged[state.current];
  document.getElementById("flag-btn").classList.toggle("flagged", state.flagged[state.current]);
}

/* ==========================================================
   RESULTS
   ========================================================== */
function showResults() {
  showScreen("results");
  var correct = 0, wrong = 0, unanswered = 0;
  for (var i = 0; i < questions.length; i++) {
    if (state.answers[i] === null) unanswered++;
    else if (state.answers[i] === questions[i].correct) correct++;
    else wrong++;
  }
  var pct = Math.round((correct / questions.length) * 100);

  document.getElementById("correct-count").textContent = correct;
  document.getElementById("wrong-count").textContent = wrong;
  document.getElementById("unanswered-count").textContent = unanswered;
  document.getElementById("score-percentage").textContent = pct + "%";
  document.getElementById("score-percentage").parentElement.style.setProperty("--pct", pct + "%");

  var label = "Continua a studiare! 💪";
  if (pct >= 90) label = "Eccellente! Sei un esperto! 🏆";
  else if (pct >= 70) label = "Ottimo lavoro! Quasi perfetto! 🌟";
  else if (pct >= 50) label = "Buono, ma c'è ancora da migliorare! 📚";
  document.getElementById("score-label").textContent = label;
}

function reviewAnswers() {
  showScreen("review");
  state.reviewed = true;
  var list = document.getElementById("review-list");
  list.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    var q = questions[i];
    var userAns = state.answers[i];
    var isCorrect = userAns === q.correct;
    var isUnanswered = userAns === null;

    var item = document.createElement("div");
    item.className = "review-item";
    if (isUnanswered) item.classList.add("unanswered-review");
    else if (isCorrect) item.classList.add("correct-review");
    else item.classList.add("wrong-review");

    var statusEmoji = isUnanswered ? "⚠️" : isCorrect ? "✅" : "❌";
    var correctText = q.answers[q.correct];
    var userText = isUnanswered ? "Non risposta" : q.answers[userAns];

    item.innerHTML =
      "<div class=\"r-question\">" + statusEmoji + " " + q.question + "</div>" +
      "<div class=\"r-answer\">La tua risposta: <strong>" + userText + "</strong></div>" +
      "<div class=\"r-answer\">Risposta corretta: <strong>" + correctText + "</strong></div>" +
      "<div class=\"r-topic\">" + q.topic + "</div>";
    list.appendChild(item);
  }
}

function goBackToResults() {
  showScreen("results");
}

function restartQuiz() {
  state.current = 0;
  state.answers = new Array(questions.length).fill(null);
  state.flagged = new Array(questions.length).fill(false);
  state.reviewed = false;
  showScreen("intro");
}

/* ==========================================================
   EVENTS
   ========================================================== */
document.getElementById("start-btn").addEventListener("click", function() {
  showScreen("quiz");
  renderQuestion();
});
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("prev-btn").addEventListener("click", prevQuestion);
document.getElementById("flag-btn").addEventListener("click", toggleFlag);
document.getElementById("restart-btn").addEventListener("click", restartQuiz);
document.getElementById("review-btn").addEventListener("click", reviewAnswers);
document.getElementById("back-to-results-btn").addEventListener("click", goBackToResults);

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowRight" || e.key === " ") nextQuestion();
  if (e.key === "ArrowLeft") prevQuestion();
  if (e.key >= "1" && e.key <= "4") selectAnswer(parseInt(e.key) - 1);
});
