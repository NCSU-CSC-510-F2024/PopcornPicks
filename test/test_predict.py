"""
Copyright (c) 2024 Jonas Trepanier, Anirudh Kaluri, Siddhi Mule
This code is licensed under MIT license (see LICENSE for details)

@author: PopcornPicks
"""

import sys
import warnings
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1]))
#pylint: disable=wrong-import-position
from src.prediction_scripts.item_based import recommend_for_new_user
#pylint: enable=wrong-import-position
warnings.filterwarnings("ignore")


def test_toy_story():
    """
    Test case 1
    """
    ts = [
        {"title": "Toy Story (1995)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert "Rabbit Seasoning (1952)" in recommendations, f"Rabbit Seasoning (1952) not in {recommendations}"

def test_kunfu_panda():
    """
    Test case 2
    """
    ts = [
        {"title": "Kung Fu Panda (2008)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert ("Zootopia (2016)" in recommendations)

def test_hindi_movie():
    """
    Test case 3
    """
    ts = [
        {"title": "Bachna Ae Haseeno (2008)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert (("Zootopia (2016)" in recommendations) is False)

def test_iron_man():
    """
    Test case 4
    """
    ts = [
        {"title": "Iron Man (2008)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert "Jurassic World (2015)" in recommendations, f"Jurassic World (2015) not in {recommendations}"

def test_robo_cop():
    """
    Test case 5
    """
    ts = [
        {"title": "RoboCop (1987)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert "Cowboys & Aliens (2011)" in recommendations, f"Cowboys & Aliens (2011) not in {recommendations}"

def test_nolan():
    """
    Test case 6
    """
    ts = [
        {"title": "Inception (2010)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert (("Zenith (2010)" in recommendations))

def test_dc():
    """
    Test case 7
    """
    ts = [
        {"title": "Man of Steel (2013)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert (
        ("Iceman (2014)" in recommendations)
    )

def test_armageddon():
    """
    Test case 8
    """
    ts = [
        {"title": "Armageddon (1998)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert (("Planet of the Apes (2001)" in recommendations))

def test_lethal_weapon():
    """
    Test case 9
    """
    ts = [
        {"title": "Lethal Weapon (1987)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert (("The Machine Girl (2008)" in recommendations))

def test_dark_action():
    """
    Test case 10
    """
    ts = [
        {"title": "Batman Returns (1992)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert (("Ghost Rider (2007)" in recommendations))

def test_dark():
    """
    Test case 11
    """
    ts = [
        {"title": "Puppet Master (1989)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert "Chrysalis (2014)" in recommendations, f"Chrysalis (2014) not in {recommendations}"

def test_horror_comedy():
    """
    Test case 12
    """
    ts = [
        {"title": "Scary Movie (2000)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert (("An American Vampire Story (1997)" in recommendations))

def test_super_heroes():
    """
    Test case 13
    """
    ts = [
        {"title": "Spider-Man (2002)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert "Maximum Ride (2016)" in recommendations, f"Maximum Ride (2016) not in {recommendations}"

def test_cartoon():
    """
    Test case 14
    """
    ts = [
        {"title": "Moana (2016)", "rating": 5.0},
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert (("Minions (2015)" in recommendations))

def test_multiple_movies():
    """
    Test case 15
    """
    ts = [
        {"title": "Twilight Saga: New Moon, The (2009)", "rating": 5.0},
        {"title": "Harry Potter and the Goblet of Fire (2005)", "rating": 5.0}
    ]
    recommendations, _, _ = recommend_for_new_user(ts)
    assert "Horton Hears a Who! (2008)" in recommendations, f"Horton Hears a Who! (2008) not in {recommendations}"


