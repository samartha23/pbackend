// prisma/seed.js
import prisma from "./prisma.js";

async function main() {
  const skills = [
    { name: "React", logo: "https://reactjs.org/logo-180x180.png" },
    { name: "Node.js", logo: "https://nodejs.org/static/images/logo.svg" },
    {
      name: "JavaScript",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    },
    {
      name: "Python",
      logo: "https://www.python.org/static/community_logos/python-logo.png",
    },
    {
      name: "Java",
      logo: "https://www.oracle.com/a/ocom/img/cb71-java-logo.png",
    },
    {
      name: "HTML5",
      logo: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png",
    },
    {
      name: "CSS3",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png",
    },
    {
      name: "TypeScript",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
    },
    {
      name: "Angular",
      logo: "https://angular.io/assets/images/logos/angular/angular.svg",
    },
    { name: "Vue.js", logo: "https://vuejs.org/images/logo.png" },
    { name: "PHP", logo: "https://www.php.net/images/logos/new-php-logo.svg" },
    {
      name: "Ruby",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg",
    },
    {
      name: "C++",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    },
    {
      name: "C#",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/C_Sharp_wordmark.svg",
    },
    {
      name: "Go",
      logo: "https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg",
    },
    {
      name: "Swift",
      logo: "https://developer.apple.com/swift/images/swift-logo.svg",
    },
    {
      name: "Kotlin",
      logo: "https://kotlinlang.org/docs/images/kotlin-logo.png",
    },
    {
      name: "Rust",
      logo: "https://rustacean.net/assets/rustacean-flat-happy.svg",
    },
    {
      name: "Docker",
      logo: "https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png",
    },
    {
      name: "Kubernetes",
      logo: "https://kubernetes.io/images/kubernetes-horizontal-color.png",
    },
    {
      name: "AWS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    },
    {
      name: "Google Cloud",
      logo: "https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png",
    },
    {
      name: "Azure",
      logo: "https://azure.microsoft.com/svghandler/azure-logo-black?width=600&height=315",
    },
    {
      name: "MongoDB",
      logo: "https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png",
    },
    {
      name: "PostgreSQL",
      logo: "https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg",
    },
  ];

  for (let skill of skills) {
    await prisma.skills.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
