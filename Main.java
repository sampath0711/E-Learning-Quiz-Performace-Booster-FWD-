import java.util.*;

class Question {
    String subject;
    String text;
    List<String> options;
    int answerIndex;
    String difficulty;
    String explanation;

    Question(String subject, String text, List<String> options,
             int answerIndex, String difficulty, String explanation) {
        this.subject = subject;
        this.text = text;
        this.options = new ArrayList<>(options);
        this.answerIndex = answerIndex;
        this.difficulty = difficulty;
        this.explanation = explanation;
    }

    void display() {
        System.out.println("\nSubject: " + subject);
        System.out.println("Difficulty: " + difficulty);
        System.out.println("Q: " + text);
        for (int i = 0; i < options.size(); i++) {
            System.out.println((i + 1) + ". " + options.get(i));
        }
    }
}

class ScoreRecord {
    String subject;
    int score;
    int total;
    double percentage;

    ScoreRecord(String subject, int score, int total) {
        this.subject = subject;
        this.score = score;
        this.total = total;
        this.percentage = total == 0 ? 0 : (score * 100.0 / total);
    }
}

class UserProfile {
    String username;
    String email;
    List<ScoreRecord> history;
    Map<String, List<Double>> subjectScores;
    Stack<String> recentActivities;
    int totalPoints;

    UserProfile(String username, String email) {
        this.username = username;
        this.email = email;
        this.history = new ArrayList<>();
        this.subjectScores = new HashMap<>();
        this.recentActivities = new Stack<>();
        this.totalPoints = 0;
    }

    void addScore(String subject, int score, int totalQuestions) {
        ScoreRecord rec = new ScoreRecord(subject, score, totalQuestions);
        history.add(rec);

        subjectScores.putIfAbsent(subject, new ArrayList<>());
        subjectScores.get(subject).add(rec.percentage);

        totalPoints += score * 10;

        recentActivities.push("Completed " + subject + " quiz : " + score + "/" + totalQuestions);
    }

    double averageScore() {
        if (history.isEmpty()) return 0;

        double sum = 0;
        for (ScoreRecord r : history) {
            sum += r.percentage;
        }
        return sum / history.size();
    }

    double bestScore() {
        double best = 0;
        for (ScoreRecord r : history) {
            best = Math.max(best, r.percentage);
        }
        return best;
    }

    void showAnalytics() {
        System.out.println("\n===== USER ANALYTICS =====");
        System.out.println("Username: " + username);
        System.out.println("Email: " + email);
        System.out.printf("Average Score: %.2f%%%n", averageScore());
        System.out.printf("Best Score: %.2f%%%n", bestScore());

        System.out.println("\nSubject Performance:");
        for (String sub : subjectScores.keySet()) {
            List<Double> scores = subjectScores.get(sub);
            double sum = 0;
            for (double s : scores) {
                sum += s;
            }
            double avg = scores.isEmpty() ? 0 : sum / scores.size();
            System.out.printf("%s -> %.2f%%%n", sub, avg);
        }

        System.out.println("\nRecent Activities:");
        if (recentActivities.isEmpty()) {
            System.out.println("No recent activity.");
        } else {
            for (int i = recentActivities.size() - 1; i >= 0; i--) {
                System.out.println("- " + recentActivities.get(i));
            }
        }
    }
}

class CompetitionQueue {
    LinkedList<String> queue;

    CompetitionQueue() {
        queue = new LinkedList<>();
    }

    void join(String user) {
        queue.add(user);
        System.out.println(user + " joined competition queue.");
    }

    void next() {
        String u = queue.poll();
        if (u == null) {
            System.out.println("Queue empty");
        } else {
            System.out.println("Next participant: " + u);
        }
    }

    void show() {
        if (queue.isEmpty()) {
            System.out.println("Queue empty");
            return;
        }
        System.out.println("Competition Queue: " + queue);
    }
}

class ELQPBSystem {
    Map<String, UserProfile> users;
    Map<String, List<Question>> questionBank;
    CompetitionQueue competitionQueue;
    Scanner sc;

    ELQPBSystem() {
        users = new HashMap<>();
        questionBank = new HashMap<>();
        competitionQueue = new CompetitionQueue();
        sc = new Scanner(System.in);
        loadQuestions();
    }

    void registerUser(String name, String email) {
        if (users.containsKey(name)) {
            System.out.println("User already exists.");
            return;
        }

        users.put(name, new UserProfile(name, email));
        System.out.println("User registered successfully.");
    }

    UserProfile searchUser(String name) {
        return users.get(name);
    }

    void addQuestion(Question q) {
        questionBank.putIfAbsent(q.subject, new ArrayList<>());
        questionBank.get(q.subject).add(q);
    }

    void loadQuestions() {
        // MATH
        addQuestion(new Question(
                "Math",
                "What is 7 squared?",
                Arrays.asList("49", "14", "42", "56"),
                0,
                "easy",
                "7 x 7 = 49"
        ));

        addQuestion(new Question(
                "Math",
                "What is 10 x 5?",
                Arrays.asList("15", "50", "40", "60"),
                1,
                "easy",
                "10 x 5 = 50"
        ));

        addQuestion(new Question(
                "Math",
                "Square root of 64?",
                Arrays.asList("6", "7", "8", "9"),
                2,
                "easy",
                "Square root of 64 is 8"
        ));

        // SCIENCE
        addQuestion(new Question(
                "Science",
                "Chemical symbol of Gold?",
                Arrays.asList("Au", "Ag", "Go", "Gd"),
                0,
                "easy",
                "Gold = Au"
        ));

        addQuestion(new Question(
                "Science",
                "Which planet is called the Red Planet?",
                Arrays.asList("Earth", "Mars", "Venus", "Jupiter"),
                1,
                "easy",
                "Mars is known as the Red Planet"
        ));

        addQuestion(new Question(
                "Science",
                "Water chemical formula?",
                Arrays.asList("CO2", "H2O", "O2", "NaCl"),
                1,
                "easy",
                "Water = H2O"
        ));

        // HISTORY
        addQuestion(new Question(
                "History",
                "India independence year?",
                Arrays.asList("1945", "1946", "1947", "1950"),
                2,
                "easy",
                "India got independence in 1947"
        ));

        addQuestion(new Question(
                "History",
                "Who was the first Prime Minister of India?",
                Arrays.asList("Nehru", "Gandhi", "Patel", "Ambedkar"),
                0,
                "easy",
                "Jawaharlal Nehru was the first Prime Minister of India"
        ));

        addQuestion(new Question(
                "History",
                "Who is called the Iron Man of India?",
                Arrays.asList("Gandhi", "Nehru", "Sardar Patel", "Bose"),
                2,
                "medium",
                "Sardar Vallabhbhai Patel is called the Iron Man of India"
        ));
    }

    List<Question> getQuestions(String subject) {
        return questionBank.getOrDefault(subject, new ArrayList<>());
    }

    void shuffle(List<Question> list) {
        Random rand = new Random();
        for (int i = list.size() - 1; i > 0; i--) {
            int j = rand.nextInt(i + 1);
            Question temp = list.get(i);
            list.set(i, list.get(j));
            list.set(j, temp);
        }
    }

    void insertionSortLeaderboard(List<UserProfile> list) {
        for (int i = 1; i < list.size(); i++) {
            UserProfile key = list.get(i);
            int j = i - 1;

            while (j >= 0 && list.get(j).totalPoints < key.totalPoints) {
                list.set(j + 1, list.get(j));
                j--;
            }

            list.set(j + 1, key);
        }
    }

    Question binarySearchQuestion(List<Question> list, String keyword) {
        List<Question> sortedList = new ArrayList<>(list);
        sortedList.sort((a, b) -> a.text.compareToIgnoreCase(b.text));

        int low = 0;
        int high = sortedList.size() - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            int cmp = sortedList.get(mid).text.compareToIgnoreCase(keyword);

            if (cmp == 0) {
                return sortedList.get(mid);
            } else if (cmp < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return null;
    }

    void searchQuestionByText() {
        System.out.println("\nAvailable Subjects: " + questionBank.keySet());
        System.out.print("Enter subject: ");
        String subject = sc.nextLine();

        List<Question> list = getQuestions(subject);
        if (list.isEmpty()) {
            System.out.println("No questions found for this subject.");
            return;
        }

        System.out.println("Enter exact question text to search:");
        String keyword = sc.nextLine();

        Question found = binarySearchQuestion(list, keyword);
        if (found != null) {
            System.out.println("\nQuestion found using Binary Search:");
            found.display();
        } else {
            System.out.println("Question not found.");
        }
    }

    void launchQuiz(String username) {
        UserProfile user = searchUser(username);

        if (user == null) {
            System.out.println("User not found");
            return;
        }

        System.out.println("\nAvailable Subjects: " + questionBank.keySet());
        System.out.print("Enter subject: ");
        String subject = sc.nextLine();

        List<Question> list = new ArrayList<>(getQuestions(subject));

        if (list.isEmpty()) {
            System.out.println("No questions found");
            return;
        }

        System.out.print("Enter difficulty (easy/medium/all): ");
        String difficulty = sc.nextLine();

        List<Question> filtered = new ArrayList<>();
        if (difficulty.equalsIgnoreCase("all")) {
            filtered.addAll(list);
        } else {
            for (Question q : list) {
                if (q.difficulty.equalsIgnoreCase(difficulty)) {
                    filtered.add(q);
                }
            }
        }

        if (filtered.isEmpty()) {
            System.out.println("No questions available for selected difficulty. Using all questions.");
            filtered = list;
        }

        shuffle(filtered);

        int totalQuestions = Math.min(3, filtered.size());
        int score = 0;

        for (int i = 0; i < totalQuestions; i++) {
            Question q = filtered.get(i);
            q.display();

            System.out.print("Answer: ");
            int ans;

            try {
                ans = Integer.parseInt(sc.nextLine()) - 1;
            } catch (Exception e) {
                ans = -1;
            }

            if (ans == q.answerIndex) {
                System.out.println("Correct");
                score++;
            } else {
                System.out.println("Wrong");
                System.out.println("Explanation: " + q.explanation);
            }
        }

        user.addScore(subject, score, totalQuestions);
        System.out.println("\nQuiz Completed. Score: " + score + "/" + totalQuestions);
    }

    void showLeaderboard() {
        List<UserProfile> board = new ArrayList<>(users.values());
        insertionSortLeaderboard(board);

        System.out.println("\n===== LEADERBOARD =====");
        if (board.isEmpty()) {
            System.out.println("No users available.");
            return;
        }

        for (int i = 0; i < board.size(); i++) {
            UserProfile u = board.get(i);
            System.out.println((i + 1) + ". " + u.username
                    + " | Points: " + u.totalPoints
                    + " | Avg: " + String.format("%.2f", u.averageScore()) + "%");
        }
    }

    void showMenu() {
        while (true) {
            System.out.println("\n===== ELQPB JAVA DSA MENU =====");
            System.out.println("1. Register User");
            System.out.println("2. Search User");
            System.out.println("3. Launch Quiz");
            System.out.println("4. Show Leaderboard");
            System.out.println("5. Show User Analytics");
            System.out.println("6. Join Competition");
            System.out.println("7. Next Competition User");
            System.out.println("8. Show Competition Queue");
            System.out.println("9. Search Question (Binary Search)");
            System.out.println("10. Exit");
            System.out.print("Choice: ");

            String c = sc.nextLine();

            switch (c) {
                case "1":
                    System.out.print("Username: ");
                    String u = sc.nextLine();
                    System.out.print("Email: ");
                    String e = sc.nextLine();
                    registerUser(u, e);
                    break;

                case "2":
                    System.out.print("Enter username: ");
                    String s = sc.nextLine();
                    UserProfile f = searchUser(s);

                    if (f != null) {
                        System.out.println("Found: " + f.username + " | " + f.email);
                    } else {
                        System.out.println("User not found");
                    }
                    break;

                case "3":
                    System.out.print("Username: ");
                    launchQuiz(sc.nextLine());
                    break;

                case "4":
                    showLeaderboard();
                    break;

                case "5":
                    System.out.print("Username: ");
                    UserProfile p = searchUser(sc.nextLine());

                    if (p != null) {
                        p.showAnalytics();
                    } else {
                        System.out.println("User not found");
                    }
                    break;

                case "6":
                    System.out.print("Username: ");
                    String joinUser = sc.nextLine();
                    if (users.containsKey(joinUser)) {
                        competitionQueue.join(joinUser);
                    } else {
                        System.out.println("User not found");
                    }
                    break;

                case "7":
                    competitionQueue.next();
                    break;

                case "8":
                    competitionQueue.show();
                    break;

                case "9":
                    searchQuestionByText();
                    break;

                case "10":
                    System.out.println("Exiting...");
                    return;

                default:
                    System.out.println("Invalid choice");
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        ELQPBSystem system = new ELQPBSystem();

        system.registerUser("admin", "admin@quiz.com");
        system.registerUser("alice", "alice@quiz.com");
        system.registerUser("bob", "bob@quiz.com");

        system.showMenu();
    }
}