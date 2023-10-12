export const portfolio = {
  article_id: 0,
  created_at: Date.now(),
  author: "chris-butterworth",
  title: "Pinned: A portfolio piece by Chris Butterworth",
  body: {
    1: "This full stack forum app was created as a portfolio piece whilst on the 13 week Software Development bootcamp at Northcoders. The back end is a RESTful API created using Express.js and PostgreSQL, the front end is an interactive Single Page Application made with React and Material UI.",

    2: "Code for the React App",

    3: "Code for the Express API",

    4: "The API has GET endpoints including topics, articles, comments and users, which call data from the PSQL relational database. This data is linked with joining tables to serve everything required in a single database call. The API will take queries in the url to filter by topic and to sort by 7 different columns. There are also POST, PATCH and DELETE endpoints for posting comments, voting on articles and comments, and deleting comments.",

    5: "Previously a touring live sound engineer, I have moved my focus to software development to find a new career and challenge myself to adapt and grow. I am a good communicator, fast learner and methodical problem solver making me an asset to your team. Please connect with me on LinkedIn to see my other work and acheivements.",

    6: "LinkedIn",

    7: "Photo - Milburn live at Koko London. That's me at the bottom of the photo behind the mixing desk!",
  },

  votes: 9000,
  article_img_url:
		"https://drive.google.com/uc?export=view&id=1K06_rJjjGsxWlfjLEOEzMnUcXoPccuz3",
  comment_count: 0,
  topic: "coding",
};
