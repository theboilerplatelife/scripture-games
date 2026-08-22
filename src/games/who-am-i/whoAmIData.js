import { shuffle } from "../../utils/random.js";

// 36 Biblical Characters for "Who Am I?"
export const CHARACTERS = [
  {
    id: "adam",
    name: "Adam",
    hints: [
      "I was the very first person created by God.",
      "God formed me from the dust of the ground.",
      "I was given the job of naming all the animals.",
      "I lived in a beautiful garden called Eden."
    ],
    scriptureRef: "Genesis 2:15",
    scriptureText: "The LORD God took the man and put him in the garden of Eden to work it and keep it."
  },
  {
    id: "eve",
    name: "Eve",
    hints: [
      "I was the first woman in the world.",
      "God created me to be a helper and partner.",
      "I was formed from a rib taken from the first man.",
      "I was tempted by a serpent in the garden."
    ],
    scriptureRef: "Genesis 3:20",
    scriptureText: "The man called his wife's name Eve, because she was the mother of all living."
  },
  {
    id: "noah",
    name: "Noah",
    hints: [
      "I lived in a time when the world was filled with wickedness.",
      "God told me to build a giant wooden boat.",
      "My family and I brought two of every animal on board.",
      "After the flood, God sent a rainbow as a promise."
    ],
    scriptureRef: "Genesis 6:22",
    scriptureText: "Noah did this; he did all that God commanded him."
  },
  {
    id: "abraham",
    name: "Abraham",
    hints: [
      "God called me to leave my country and travel to a new land.",
      "My name means 'Father of many nations'.",
      "God told me my descendants would be as numerous as the stars.",
      "My wife Sarah had a baby boy named Isaac when we were very old."
    ],
    scriptureRef: "Genesis 15:5",
    scriptureText: "And he brought him outside and said, 'Look toward heaven, and number the stars, if you are able to number them.'"
  },
  {
    id: "sarah",
    name: "Sarah",
    hints: [
      "I traveled with my husband from Ur to Canaan.",
      "I laughed when three visitors said I would have a baby.",
      "God changed my name, which means 'Princess'.",
      "I became a joyful mother to Isaac when I was 90 years old!"
    ],
    scriptureRef: "Genesis 21:6",
    scriptureText: "And Sarah said, 'God has made laughter for me; everyone who hears will laugh over me.'"
  },
  {
    id: "jacob",
    name: "Jacob",
    hints: [
      "I had a twin brother named Esau.",
      "I had a dream about a ladder reaching up to heaven.",
      "I worked 14 years to marry the woman I loved.",
      "God changed my name to Israel."
    ],
    scriptureRef: "Genesis 28:12",
    scriptureText: "And he dreamed, and behold, there was a ladder set up on the earth, and the top of it reached to heaven."
  },
  {
    id: "joseph",
    name: "Joseph",
    hints: [
      "My father Jacob gave me a beautiful coat of many colors.",
      "My jealous brothers threw me into a pit.",
      "God gave me the ability to interpret Pharaoh's dreams.",
      "I became a powerful ruler in Egypt and saved my family from famine."
    ],
    scriptureRef: "Genesis 50:20",
    scriptureText: "As for you, you meant evil against me, but God meant it for good, to bring it about that many people should be kept alive."
  },
  {
    id: "moses",
    name: "Moses",
    hints: [
      "I was hidden in a papyrus basket in the river when I was a baby.",
      "God spoke to me from a burning bush.",
      "I stretched out my staff and God parted the Red Sea.",
      "God gave me the Ten Commandments on Mount Sinai."
    ],
    scriptureRef: "Exodus 3:4",
    scriptureText: "God called to him out of the bush, 'Moses, Moses!'"
  },
  {
    id: "miriam",
    name: "Miriam",
    hints: [
      "I am the brave older sister of Moses and Aaron.",
      "I watched my baby brother float in a basket on the Nile River.",
      "I led the women of Israel in a song of praise with a tambourine.",
      "I celebrated after God parted the Red Sea."
    ],
    scriptureRef: "Exodus 15:20",
    scriptureText: "Then Miriam the prophetess, the sister of Aaron, took a tambourine in her hand."
  },
  {
    id: "joshua",
    name: "Joshua",
    hints: [
      "I was Moses' helper and became the leader of Israel after him.",
      "I was one of the two spies who believed God would give us the Promised Land.",
      "I led the Israelites across the Jordan River.",
      "I commanded the army when the walls of Jericho fell down."
    ],
    scriptureRef: "Joshua 1:9",
    scriptureText: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed."
  },
  {
    id: "rahab",
    name: "Rahab",
    hints: [
      "I lived in a house built into the city wall of Jericho.",
      "I hid two Israelite spies on my roof.",
      "I tied a scarlet red cord in my window so my family would be saved.",
      "I am remembered in the lineage of Jesus."
    ],
    scriptureRef: "Joshua 2:21",
    scriptureText: "And she tied the scarlet cord in the window."
  },
  {
    id: "gideon",
    name: "Gideon",
    hints: [
      "An angel called me a 'mighty man of valor'.",
      "I tested God's promise with a fleece of wool.",
      "God shrank my army down to just 300 men.",
      "We defeated the Midianites using trumpets and torches inside clay jars."
    ],
    scriptureRef: "Judges 7:20",
    scriptureText: "They held in their left hands the torches, and in their right hands the trumpets to blow."
  },
  {
    id: "samson",
    name: "Samson",
    hints: [
      "God gave me incredible, superhuman strength.",
      "I defeated a lion with my bare hands.",
      "My strength was a secret tied to my long hair.",
      "I pushed down the pillars of a Philistine temple."
    ],
    scriptureRef: "Judges 16:17",
    scriptureText: "He told her all his heart, and said to her, 'A razor has never come upon my head.'"
  },
  {
    id: "ruth",
    name: "Ruth",
    hints: [
      "I was a Moabite woman who chose to follow the God of Israel.",
      "I told my mother-in-law Naomi, 'Where you go I will go.'",
      "I gathered leftover barley in the fields of Boaz.",
      "I became the great-grandmother of King David."
    ],
    scriptureRef: "Ruth 1:16",
    scriptureText: "But Ruth said, 'Do not urge me to leave you or to return from following you. For where you go I will go.'"
  },
  {
    id: "samuel",
    name: "Samuel",
    hints: [
      "My mother Hannah prayed for me and dedicated me to the Lord.",
      "I heard God calling my name in the night when I was a boy.",
      "I served in the tabernacle with Eli the priest.",
      "I grew up to be a great prophet and anointed Israel's first two kings."
    ],
    scriptureRef: "1 Samuel 3:10",
    scriptureText: "And the LORD came and stood, calling as at other times, 'Samuel! Samuel!' And Samuel said, 'Speak, for your servant hears.'"
  },
  {
    id: "david",
    name: "David",
    hints: [
      "I was a young shepherd boy who protected my sheep from a lion and a bear.",
      "I defeated a giant champion named Goliath with a sling and a stone.",
      "I played the harp to soothe King Saul.",
      "I wrote many of the Psalms and became the greatest king of Israel."
    ],
    scriptureRef: "1 Samuel 17:50",
    scriptureText: "So David prevailed over the Philistine with a sling and with a stone."
  },
  {
    id: "solomon",
    name: "Solomon",
    hints: [
      "I was the son of King David.",
      "When God asked what I wanted, I asked for wisdom instead of riches.",
      "I built the first great Temple in Jerusalem.",
      "I collected and wrote hundreds of Proverbs."
    ],
    scriptureRef: "1 Kings 3:9",
    scriptureText: "Give your servant therefore an understanding mind to govern your people, that I may discern between good and evil."
  },
  {
    id: "elijah",
    name: "Elijah",
    hints: [
      "I was a prophet who challenged the prophets of Baal on Mount Carmel.",
      "God sent fire from heaven to consume my water-soaked sacrifice.",
      "Ravens brought me bread and meat by a brook.",
      "I didn't die, but was taken up to heaven in a chariot of fire."
    ],
    scriptureRef: "1 Kings 18:38",
    scriptureText: "Then the fire of the LORD fell and consumed the burnt offering and the wood and the stones and the dust."
  },
  {
    id: "elisha",
    name: "Elisha",
    hints: [
      "I was plowing a field when Elijah threw his cloak over me.",
      "I asked for a double portion of Elijah's spirit.",
      "I told a general with leprosy to wash in the Jordan River seven times.",
      "God used me to make an iron ax head float in the water."
    ],
    scriptureRef: "2 Kings 2:9",
    scriptureText: "Elisha said, 'Please let there be a double portion of your spirit on me.'"
  },
  {
    id: "naaman",
    name: "Naaman",
    hints: [
      "I was a brave army commander, but I suffered from leprosy.",
      "A young servant girl told my wife about a prophet in Israel who could heal me.",
      "I was angry when Elisha told me to wash in the muddy Jordan River.",
      "My skin was healed and became like a child's after I dipped seven times."
    ],
    scriptureRef: "2 Kings 5:14",
    scriptureText: "So he went down and dipped himself seven times in the Jordan, according to the word of the man of God."
  },
  {
    id: "esther",
    name: "Esther",
    hints: [
      "I was a young Jewish orphan raised by my cousin Mordecai.",
      "I was chosen for my beauty to become the Queen of Persia.",
      "I bravely approached the king without being summoned.",
      "I risked my life to save my people from the wicked plot of Haman."
    ],
    scriptureRef: "Esther 4:14",
    scriptureText: "And who knows whether you have not come to the kingdom for such a time as this?"
  },
  {
    id: "job",
    name: "Job",
    hints: [
      "I was a very wealthy man who lost my flocks, my servants, and my children in one day.",
      "I lost my health and sat in ashes scraping my skin.",
      "Through all my suffering, I refused to curse God.",
      "God restored my fortunes and gave me twice as much as I had before."
    ],
    scriptureRef: "Job 1:22",
    scriptureText: "In all this Job did not sin or charge God with wrong."
  },
  {
    id: "isaiah",
    name: "Isaiah",
    hints: [
      "I saw a vision of the LORD sitting upon a high and lofty throne.",
      "An angel touched my lips with a burning coal.",
      "When God asked who would go, I said, 'Here I am! Send me.'",
      "I prophesied about a coming Messiah who would be born to a virgin."
    ],
    scriptureRef: "Isaiah 6:8",
    scriptureText: "And I heard the voice of the Lord saying, 'Whom shall I send, and who will go for us?' Then I said, 'Here I am! Send me.'"
  },
  {
    id: "jeremiah",
    name: "Jeremiah",
    hints: [
      "I was known as the 'weeping prophet' because of my sorrow for Jerusalem.",
      "God told me He knew me before I was formed in my mother's womb.",
      "I was thrown into a deep, muddy cistern because people didn't like my prophecies.",
      "I bought a field to show that God would one day bring His people back from exile."
    ],
    scriptureRef: "Jeremiah 1:5",
    scriptureText: "Before I formed you in the womb I knew you, and before you were born I consecrated you."
  },
  {
    id: "daniel",
    name: "Daniel",
    hints: [
      "I was taken captive to Babylon as a young man.",
      "I purposed in my heart not to defile myself with the king's rich food.",
      "God gave me the ability to understand and interpret dreams.",
      "God sent an angel to shut the lions' mouths when I was thrown in their den for praying."
    ],
    scriptureRef: "Daniel 6:22",
    scriptureText: "My God sent his angel and shut the lions' mouths, and they have not harmed me."
  },
  {
    id: "jonah",
    name: "Jonah",
    hints: [
      "God told me to preach to the city of Nineveh.",
      "I ran away and boarded a ship heading for Tarshish.",
      "I was thrown into the sea during a terrible storm.",
      "I spent three days in the belly of a great fish before it spit me out."
    ],
    scriptureRef: "Jonah 1:17",
    scriptureText: "And the LORD appointed a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights."
  },
  {
    id: "mary",
    name: "Mary",
    hints: [
      "The angel Gabriel visited me in Nazareth.",
      "I was told I would have a baby by the Holy Spirit.",
      "I wrapped my newborn son in swaddling cloths and laid Him in a manger.",
      "I treasured up all these things, pondering them in my heart."
    ],
    scriptureRef: "Luke 1:38",
    scriptureText: "And Mary said, 'Behold, I am the servant of the Lord; let it be to me according to your word.'"
  },
  {
    id: "john_baptist",
    name: "John the Baptist",
    hints: [
      "My clothes were made of camel's hair, and I ate locusts and wild honey.",
      "I was a voice crying in the wilderness: 'Prepare the way of the Lord!'",
      "I baptized people in the Jordan River.",
      "I baptized Jesus and saw the Spirit descend like a dove."
    ],
    scriptureRef: "Matthew 3:3",
    scriptureText: "For this is he who was spoken of by the prophet Isaiah when he said, 'The voice of one crying in the wilderness: Prepare the way of the Lord; make his paths straight.'"
  },
  {
    id: "peter",
    name: "Peter",
    hints: [
      "My brother Andrew and I were fishermen when Jesus called us to be fishers of men.",
      "I stepped out of a boat and walked on water toward Jesus.",
      "I denied knowing Jesus three times before the rooster crowed.",
      "I preached boldly on the day of Pentecost and 3,000 people were saved."
    ],
    scriptureRef: "Matthew 14:29",
    scriptureText: "He said, 'Come.' So Peter got out of the boat and walked on the water and came to Jesus."
  },
  {
    id: "john",
    name: "John",
    hints: [
      "I was a fisherman along with my brother James.",
      "I was known as the disciple whom Jesus loved.",
      "I wrote a Gospel, three letters, and the book of Revelation.",
      "I saw a vision of heaven while exiled on the island of Patmos."
    ],
    scriptureRef: "Revelation 1:9a",
    scriptureText: "I, John, your brother and partner in the tribulation and the kingdom and the patient endurance that are in Jesus, was on the island called Patmos on account of the word of God."
  },
  {
    id: "matthew",
    name: "Matthew",
    hints: [
      "I was sitting at my tax collector's booth when Jesus said, 'Follow Me.'",
      "I threw a great banquet at my house for Jesus and my friends.",
      "I left my profitable job to become one of the twelve apostles.",
      "I wrote the first Gospel book in the New Testament."
    ],
    scriptureRef: "Matthew 9:9",
    scriptureText: "As Jesus passed on from there, he saw a man called Matthew sitting at the tax booth, and he said to him, 'Follow me.'"
  },
  {
    id: "luke",
    name: "Luke",
    hints: [
      "I was a beloved physician and a companion of Paul.",
      "I was not one of the original twelve disciples.",
      "I wrote a detailed Gospel about the life of Jesus.",
      "I also wrote the book of Acts, telling the history of the early church."
    ],
    scriptureRef: "Colossians 4:14",
    scriptureText: "Luke the beloved physician greets you."
  },
  {
    id: "paul",
    name: "Paul",
    hints: [
      "I used to persecute the early church under the name Saul.",
      "A blinding light from heaven knocked me to the ground on the road to Damascus.",
      "I became an apostle to the Gentiles and went on many missionary journeys.",
      "I wrote many of the letters in the New Testament, often from a prison cell."
    ],
    scriptureRef: "Acts 9:4",
    scriptureText: "And falling to the ground, he heard a voice saying to him, 'Saul, Saul, why are you persecuting me?'"
  },
  {
    id: "stephen",
    name: "Stephen",
    hints: [
      "I was chosen as one of the first seven deacons to help serve food to widows.",
      "I did great wonders and signs among the people.",
      "I preached a bold sermon to the religious leaders.",
      "I was the very first person to die for believing in Jesus."
    ],
    scriptureRef: "Acts 7:59",
    scriptureText: "And as they were stoning Stephen, he called out, 'Lord Jesus, receive my spirit.'"
  },
  {
    id: "nehemiah",
    name: "Nehemiah",
    hints: [
      "I was a cupbearer to the King of Persia.",
      "I wept when I heard the walls of Jerusalem were broken down.",
      "The king gave me permission and supplies to go rebuild the city.",
      "We rebuilt the walls in just 52 days with a trowel in one hand and a sword in the other."
    ],
    scriptureRef: "Nehemiah 6:15",
    scriptureText: "So the wall was finished on the twenty-fifth day of the month Elul, in fifty-two days."
  },
  {
    id: "micah",
    name: "Micah",
    hints: [
      "I was a prophet from a small town called Moresheth.",
      "I prophesied during the reigns of Jotham, Ahaz, and Hezekiah.",
      "I predicted that the Messiah would be born in the little town of Bethlehem.",
      "I said God requires us to do justice, love mercy, and walk humbly."
    ],
    scriptureRef: "Micah 6:8b",
    scriptureText: "What does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?"
  }
];

/* Four names to choose from: the right one and three others.

   The seed is not optional. shuffle() swaps through jitter(seed, …), and
   without a seed every index computes NaN — which returned an array whose
   last entry was undefined, so players only ever saw three choices. */
export function getRandomChoices(correctId, count = 4, seed = 1) {
  const others = CHARACTERS.filter((c) => c.id !== correctId);
  const picked = shuffle(others, seed).slice(0, count - 1);
  const correct = CHARACTERS.find((c) => c.id === correctId);
  return shuffle([...picked, correct], seed + 7);
}

/* Stars for one character: knowing them from the first clue is worth
   three, and each further clue — asked for, or handed over after a wrong
   guess — costs one. */
export function starsForHintsUsed(hintsShown) {
  if (hintsShown <= 1) return 3;
  if (hintsShown === 2) return 2;
  return 1;
}
