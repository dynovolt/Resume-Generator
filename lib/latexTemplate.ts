export const LATEX_TEMPLATE = `
%-------------------------
% Resume in LaTeX
% Author : AI Resume Generator
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[2]{
  \\item\\small{
    \\textbf{#1}{: #2 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-5pt}
}

\\newcommand{\\resumeSubItem}[2]{\\resumeItem{#1}{#2}\\vspace{-4pt}}
\\renewcommand{\\labelitemii}{$\\circ$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  CV STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING-----------------
\\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
  \\textbf{\\href{http://sourabhbajaj.com/}{\\Large [First Name] [Last Name]}} & Email : \\href{mailto:[email@example.com]}{[email@example.com]}\\\\
  \\href{http://linkedin.com/in/[profile]}{linkedin.com/in/[profile]} & Mobile : [Phone Number] \\\\
  \\href{http://github.com/[profile]}{github.com/[profile]} & Portfolio: \\href{http://[portfolio]}{[Portfolio URL]}
\\end{tabular*}

%-----------EDUCATION-----------------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {[University Name]}{[Location]}
      {[Degree] in [Major]; GPA: [GPA]}{[Start Date] -- [End Date]}
  \\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------------
\\section{Experience}
  \\resumeSubHeadingListStart

    \\resumeSubheading
      {[Company Name]}{[Location]}
      {[Job Title]}{[Start Date] -- [End Date]}
      \\resumeItemListStart
        \\resumeItem{[Metric/Achievement]}
          {[Description of responsibility and impact, quantified where possible.]}
        \\resumeItem{[Metric/Achievement]}
          {[Description of responsibility and impact, quantified where possible.]}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd

%-----------PROJECTS-----------------
\\section{Projects}
  \\resumeSubHeadingListStart
    \\resumeSubItem{[Project Name]}
      {[Description of project, technology used, and impact.]}
  \\resumeSubHeadingListEnd

%--------PROGRAMMING SKILLS------------
\\section{Programming Skills}
 \\resumeSubHeadingListStart
   \\item{
     \\textbf{Languages}{: [Languages]}
     \\hfill
     \\textbf{Technologies}{: [Technologies/Frameworks]}
   }
 \\resumeSubHeadingListEnd

%-----------ACHIEVEMENTS-----------------
\\section{Achievements & Certifications}
 \\resumeSubHeadingListStart
   \\item{
     \\textbf{[Certification/Award Name]}{: [Description or Issuer]}
   }
 \\resumeSubHeadingListEnd

\\end{document}
`;
