export default function Workshops() {
  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8" data-testid="text-workshops-title">
            <span className="text-primary">WORKSHOPS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Creative workshops and skill-sharing sessions for the community
          </p>
        </div>

        {/* Image Placeholder */}
        <div className="w-full h-96 bg-card/30 rounded-xl flex items-center justify-center mb-20">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">IMAGE HERE</p>
            <p className="text-muted-foreground mt-2">Workshop space image placeholder</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-accent" data-testid="text-workshops-description">Learn & Create Together</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our workshops are designed to bring the creative community together. Whether you're a beginner looking to learn new skills or an experienced artist wanting to share your knowledge, our workshop program offers something for everyone.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From music production masterclasses to podcast creation workshops, photography techniques to creative collaboration sessions - we host regular events that foster learning, networking, and artistic growth.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Upcoming Workshops</h3>
              <p className="text-muted-foreground">Check back soon for our latest workshop schedule. We regularly update our program with new sessions covering various creative disciplines.</p>
            </div>
            
            <div className="bg-card/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Workshop Types</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Music Production & Recording</li>
                <li>• Podcast Creation & Broadcasting</li>
                <li>• Photography & Visual Arts</li>
                <li>• Creative Collaboration</li>
                <li>• Industry Skill Sessions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in Hosting a Workshop?</h2>
          <p className="text-muted-foreground mb-8">We're always looking for passionate creatives to share their expertise with the community</p>
          <a 
            href="mailto:TEAM@ON3.STUDIO" 
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-contact-workshop"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
}