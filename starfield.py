import random
import xml.etree.ElementTree as ET


def generate_starfield(
    width=128,
    height=128,
    num_stars=100,
    min_radius=0.5,
    max_radius=2.0,
    colors=None,
    output_file='starfield.svg'
):
    """
    Generate an SVG starfield with random circles on a transparent background.

    Parameters:
    - width (int): Width of the SVG canvas in pixels.
    - height (int): Height of the SVG canvas in pixels.
    - num_stars (int): Number of stars (circles) to draw.
    - min_radius (float): Minimum circle radius.
    - max_radius (float): Maximum circle radius.
    - colors (list of str): List of color strings (e.g., ['#ffffff', '#ffd700']).
                            If None, defaults to ['#FFFFFF'].
    - output_file (str): Filename for the generated SVG.
    """
    # Default to white stars if no colors provided
    if colors is None:
        colors = ['#FFFFFF']

    # Create the root SVG element
    svg = ET.Element(
        'svg',
        width=str(width),
        height=str(height),
        version='1.1',
        xmlns='http://www.w3.org/2000/svg'
    )

    # Set transparent background (no rect needed since default canvas is transparent)

    # Generate random stars
    for _ in range(num_stars):
        cx = random.uniform(0, width)
        cy = random.uniform(0, height)
        r = random.uniform(min_radius, max_radius)
        color = random.choice(colors)

        circle = ET.SubElement(
            svg,
            'circle',
            cx=f"{cx:.2f}",
            cy=f"{cy:.2f}",
            r=f"{r:.2f}",
            fill=color
        )

    # Write to file
    tree = ET.ElementTree(svg)
    tree.write(
        output_file,
        encoding='utf-8',
        xml_declaration=True
    )
    print(f"Starfield SVG saved to {output_file}")


if __name__ == '__main__':
    # Example usage: generate a starfield with custom settings
    side = 1024
    generate_starfield(
        width=side,
        height=side,
        num_stars=1024,
        min_radius=0.3,
        max_radius=1.5,
        colors=['#ebdbb2'],
        output_file='starfield.svg'
    )

